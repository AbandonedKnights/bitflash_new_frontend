function PieInfographic(stats) {

	this.stats = stats;
	this.render = render;

	this._angles = {};
	this._pathNodes = [];
	this._contentNodes = [];
	this._currentPie = -1;
	this._center = 0;
	this._radius = 0;
	this._centerCircleGroup = null;
	this._performAction = _performAction;
	this._drawPie = _drawPie;
	this._rotateGraphicToPie = _rotateGraphicToPie;
	this._createDOMForCenter = _createDOMForCenter;
	this._getArcPositionsForState = _getArcPositionsForState;
	this._setDataAttributes = _setDataAttributes;
	this._getNextIncrement = _getNextIncrement;	
	this._attachContent = _attachContent;
	this._detailAnimations = [];

	function render(parentEl) {

		var self = this;

		var svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			parentGroupEl = document.createElementNS('http://www.w3.org/2000/svg', 'g'),			
			svgDimensions, center, radius,
			baseAngle, expandedAngle, shrunkAngle;

		svgEl.setAttribute('style', 'width:100% ;height:100%');

		if (typeof(parentEl) !== undefined) {
			parentGroupEl.classList.add('outer-group');
			svgEl.appendChild(parentGroupEl);
			parentEl.appendChild(svgEl);
		}

		svgDimensions = {
			width: svgEl.clientWidth || svgEl.parentNode.clientWidth,
			height: svgEl.clientHeight || svgEl.parentNode.clientHeight
		};

		center = {
			x: svgDimensions.width / 2,
			y: svgDimensions.height / 2
		};

		radius = svgDimensions.width * 0.4; //Occupying 80% of the SVG size

		self._center = center;
		self._radius = radius;

		baseAngle = 2 * Math.PI / this.stats.length;
		expandedAngle = Math.min(2 * Math.PI - (0.15 * Math.PI * this.stats.length), baseAngle * 4, Math.PI); //Pie, on expansion to 3 times, should leave atleast 36 degrees for each other pie, and cannot be more than 180 degrees.
		shrunkAngle = (2 * Math.PI - expandedAngle) / (stats.length - 1); //Angle when a pie is shrunk

		self._angles.baseAngle = baseAngle;
		self._angles.expandedAngle = expandedAngle;
		self._angles.shrunkAngle = shrunkAngle;

		for(var i=0; i<stats.length;i++){
			var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
			contentEl = document.createElementNS('http://www.w3.org/2000/svg', 'g'),
			textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text'),
			groupEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
			pathEl.setAttribute('fill', stats[i].color);
			
			groupEl.addEventListener('',function(event){

					if(this.getAttribute('data-state') === 'expand'){
						return;
					}

					var indexInParent = self._pathNodes.indexOf(this.getElementsByTagName('path')[0]),
					currentGroupEl;

					if(self._currentPie >= 0){
						currentGroupEl = self._pathNodes[self._currentPie];
						_hideContentForPie(currentGroupEl.nextSibling,self._detailAnimations[1]);
					}

					//Bring all pies to normal state
					self._performAction('normal',0,true,function(){


						_setStateForCenter(self._centerCircleGroup,'icon',{
							icon: stats[indexInParent].icon
						});

						//Rotate the graphic to center the clicked pie.
						self._rotateGraphicToPie(indexInParent,function(){
						
							//Expand/shrink pies based on the clicked pie.
							self._performAction('expand', indexInParent,true,function(){

								_renderContentForPie(self._pathNodes[indexInParent].nextSibling,self._center,self._radius,self._detailAnimations);
								self._currentPie = indexInParent;

							});
						});							
					});

					event.stopPropagation();
			});

			this._pathNodes.push(groupEl.appendChild(pathEl));
			contentEl.classList.add('content-group');
				
			this._contentNodes.push(groupEl.appendChild(contentEl));
			parentGroupEl.appendChild(groupEl);
		}
		
		self._createDOMForCenter(svgEl);

		//Create the clip-path defs.			
		var clipPath = _createSVGElement('clipPath',{
			'id':'detailClipPath'
		}),
		clipCircle = _createSVGElement('circle',{
			'r':'21.5',
			'stroke':'white'
		}),
		detailAnimationEnter = _createSVGElement('animate',{
			id:'animation-enter',
			attributeName : 'opacity',
            from: 0,
            to : 1,
            dur: '1s',
            begin: '0s',
            fill: 'freeze'
		}),
		detailAnimationExit = _createSVGElement('animate',{
			id:'animation-exit',
			attributeName : 'opacity',
            from: 1,
            to : 0,
            dur: '1s',
            begin: '0s',
            fill: 'freeze'
		});

		clipPath.appendChild(clipCircle);
		
		_addDefinition(svgEl,clipPath);

		//SVG based opacity-animation since Safari does not support CSS opacity animation on SVG group tags.
		this._detailAnimations.push(detailAnimationEnter);
		this._detailAnimations.push(detailAnimationExit);
		
		this._attachContent();

		this._performAction('normal');

		_setStateForCenter(self._centerCircleGroup,'text',{
			head: '',
			subhead: 'Bitflash',
			detail: ''
		});
	}

	function _rotateGraphicToPie(index,callback){
		var parentGroupEl = this._pathNodes[0].parentNode.parentNode,
		angleFrom  = parseFloat(parentGroupEl.getAttribute('data-offset-angle')) || 0,
		angleTo = -1 * (index * this._angles.baseAngle * 180/ Math.PI);

		if(angleFrom === angleTo){
			if(callback)
				callback();
		}

		angleTo += Math.ceil(angleFrom/360)*360;

		if(angleTo > angleFrom)
			angleTo -= 360; //angleTo should always be less than angleFrom for a anti-clockwise rotation.

		if(callback)
			parentGroupEl.addEventListener('transitionend',function(event){
				callback();
				event.target.removeEventListener(event.type, arguments.callee);
			});

		_setTransformProp(parentGroupEl,'rotate',(angleTo) + 'deg');		

		for(var i = 0; i < this._contentNodes.length;i++){

			var icon = this._contentNodes[i].querySelector('g.icon-group');

			icon.transition = 'transform 2s';
			icon.style.webkitTransition = '-webkit-transform 2s';
					
			icon.addEventListener('transitionend',function(event){
					event.target.style.transition = '';
					event.target.style.webkitTransition = '';
					event.target.removeEventListener(event.type, arguments.callee);
			});	

			_setTransformProp(icon,'rotate',(-1 * angleTo) + 'deg');
		}

		parentGroupEl.setAttribute('data-offset-angle',angleTo);
	}

	function _createDOMForCenter(svgEl){

		//Create the circle in the center
		var circleEl = _createSVGElement('circle',{
			// 'fill':'#ffffff',
			'cx': this._center.x,
			'cy': this._center.y,
			'r' : this._radius * 0.4			
		}),
		clipCircle = circleEl.cloneNode();

		clipCircle.setAttribute('cx',this._radius * 0.4);
		clipCircle.setAttribute('cy',this._radius * 0.4);		
		clipCircle.removeAttribute('fill');

		var clipPath = _createSVGElement('clipPath',{
			id: 'centerClipPath'
			
			
		});

		clipPath.appendChild(clipCircle);

		var textIcon = _createSVGElement('text',{
			x :  this._radius * 0.4,
			y :  this._radius * 0.4,
			class : 'icon',
			'font-family':'FontAwesome',
			'text-anchor':'middle',
			'dominant-baseline':'central',

		}),
		textHead = _createSVGElement('text',{
			x :  this._radius * 0.4,
			y :  this._radius * 0.1,
			class : 'head',			
			'text-anchor':'middle',
			'dominant-baseline':'central',
			'font-size': '40px'
			
		}),
		textSubHead = _createSVGElement('text',{
			x :  this._radius * 0.4,
			y :  this._radius * 0.4,
			class : 'subhead',
		
			'font-size' : '20px',
			'text-anchor':'middle',
			'dominant-baseline':'central'
		}),
		textDetail = _createSVGElement('text',{
			x :  this._radius * 0.4,
			y :  this._radius * 0.7,
			class : 'detail',			
			'font-size' : '10px',
			'text-anchor':'middle',
			'dominant-baseline':'central',
		}),
		image = _createSVGElement('image',{
			width :  this._radius,
			height :  this._radius,
			x: '-' + this._radius * 0.1,
			y: '-' + this._radius * 0.1,
			// fill: 'white',
			'clip-path':'url(#centerClipPath)'
		}),
		detailRect = _createSVGElement('rect',{
			width :  this._radius * 0.8,
			height :  this._radius * 0.4,
			y: this._radius * 0.55,
			class: 'detail-group',
			'fill':'#393D45',	
			'clip-path':'url(#centerClipPath)'
		}),
		contentGroup = _createSVGElement('g',{
			width :  this._radius * 0.8,
			height :  this._radius * 0.8,
			class: 'center-group',
			fill: 'White'			
		});

		_setTransformProp(contentGroup,'translate',(this._center.x - this._radius*0.4) + 'px,' + 
				(this._center.y - this._radius*0.4)+'px');
				
		contentGroup.appendChild(image);
		contentGroup.appendChild(textIcon);		
		contentGroup.appendChild(textHead);
		contentGroup.appendChild(detailRect);
		contentGroup.appendChild(textSubHead);
		contentGroup.appendChild(textDetail);
		

		svgEl.appendChild(circleEl);

		_addDefinition(svgEl,clipPath);

		this._centerCircleGroup = svgEl.appendChild(contentGroup);		
	}

	function _setStateForCenter(circleEl,state,details){		

		var textIcon,textHead,textSubHead,textDetail,image;

		textIcon = circleEl.querySelectorAll('text.icon')[0];
		textHead = circleEl.querySelectorAll('text.head')[0];
		textSubHead = circleEl.querySelectorAll('text.subhead')[0];
		textDetail = circleEl.querySelectorAll('text.detail')[0];
		image = circleEl.querySelectorAll('image')[0];		

		//@TODO: Animate out the current state and then do the below.

		//Set data for next state of the circle
		if(state === 'icon'){
			//textIcon.textContent = '\uf0e1';
			textIcon.textContent = details.icon;
		}else if(state === 'text'){
			textHead.textContent = details.head.toUpperCase();
			textSubHead.textContent = details.subhead.toUpperCase().replace('-',' ').replace('-',' ');
			textDetail.textContent = details.detail.toUpperCase();
		}else if(state === 'image'){
			image.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',details.image);
			textSubHead.textContent = details.subhead.toUpperCase();
			textDetail.textContent = details.detail.toUpperCase();
		}

		//Set classes for layout for next state of the circle
		['icon','image','text'].forEach(function(stateIterator){
			if(state !== stateIterator)
				circleEl.classList.remove('state-'+stateIterator);
			else
				circleEl.classList.add('state-'+stateIterator);
		});

		//@TODO: Animate in the new state.
	}

	function _performAction(state,index,animate,callback){

			var self = this,
			center = self._center,
			radius = self._radius,
			arcPositions = [];

			if(!animate){			

				arcPositions = self._getArcPositionsForState(state);

				for(var i=0; i< self._pathNodes.length;i++){								
					self._drawPie(i,_getPathDescForArcPositions(center,radius,arcPositions[i][0],arcPositions[i][1]));					
				}	
				
				self._setDataAttributes(state,index);

				if(callback)
					callback();

			} else{

				var targetAngles = [],
				increments = [],
				arcPositions = self._getArcPositionsForState(state,index);

				for(var i=0; i< arcPositions.length; i++){
					
					targetAngles.push([
						_cartesianToPolar(center,arcPositions[i][0]).theta,
						_cartesianToPolar(center,arcPositions[i][1]).theta
					]);

					//Calculating first set of increments
					increments.push(self._getNextIncrement(self._pathNodes[i],
							targetAngles[i],
						(i === index && state === 'expand')? radius*1.05 : null));
				}


				function drawIncrement(){
					
					for (var i = 0; i < increments.length; i++) {
						if(increments[i] !== null)
							self._drawPie(i,increments[i]);
					};

					increments = [];
					var nextFrameRequestNeeded = false;

					//Get the next set of increments
					for(i=0; i < self._pathNodes.length; i++){
						
						increments.push(self._getNextIncrement(self._pathNodes[i],
							targetAngles[i],
							(i === index && state === 'expand')? radius*1.05 : null));

						if(increments[i] !== null){
							nextFrameRequestNeeded = true;
						}
					}

					//Request next frame only if there is atleast one path that needs to be drawn.
					if(nextFrameRequestNeeded)
						_requestAnimationFrame(drawIncrement);
					else{
						self._setDataAttributes(state,index);
						if(callback)
							callback();
					}
				}

				_requestAnimationFrame(drawIncrement);
			}
		}


		//Calculate arc start-end positions for each pie based on the state.
		function _getArcPositionsForState(state,index){

			var self = this,
			center = self._center,
			radius = self._radius,
			baseAngle = self._angles.baseAngle,
			expandedAngle = self._angles.expandedAngle,
			shrunkAngle = self._angles.shrunkAngle,
			arcPositions = [],angleOffset;

			if(state === 'normal'){

					angleOffset = self._angles.baseAngle/2;
					
					for(var i=0;i<stats.length;i++){
						arcPositions.push([
							_polarToCartesian(center,radius,angleOffset),
							_polarToCartesian(center,radius,angleOffset - baseAngle)
						]);
						angleOffset-=baseAngle;
					}					

			}else if(state === 'expand'){
					index = index || 0;

					if(index === 0){
						angleOffset = self._angles.expandedAngle/2;

					}else{
						angleOffset = -1 * (index * baseAngle);
						angleOffset += expandedAngle/2 + index * shrunkAngle;						
					}

					angleOffset += shrunkAngle/2;

					for(var i=0;i<stats.length;i++){

						var arcPoints = [ _polarToCartesian(center,radius,angleOffset) ]; //Pushing the start point

						if(i === index){
							angleOffset -= expandedAngle;

							if(angleOffset < -2 * Math.PI)
								angleOffset += 2 * Math.PI;

							arcPoints.push(_polarToCartesian(center,radius,angleOffset));
							
						}else{
							angleOffset -= shrunkAngle;

							if(angleOffset < -2*Math.PI)
								angleOffset += -2*Math.PI;

							arcPoints.push(_polarToCartesian(center,radius,angleOffset));
							
						}
						arcPositions.push(arcPoints);
					}
			}

			return arcPositions;
		}

		function _getNextIncrement(el,targetAngles,targetRadius){
			
			var self = this,
			center = self._center,
			radius = targetRadius || self._radius,
			pieTargetAngles = [];
			currentArcPoints = _getArcCoordinates(el);

			Array.prototype.push.apply(pieTargetAngles,targetAngles)
			
			var sourceAngles = [ _cartesianToPolar(center,currentArcPoints[0]).theta,
				_cartesianToPolar(center,currentArcPoints[1]).theta
			];			

			if(Math.abs(pieTargetAngles[0] - sourceAngles[0]) <= Math.pow(10,-10)  && 
				Math.abs(pieTargetAngles[1] - sourceAngles[1]) <= Math.pow(10,-10)){
				//If source and target angles are equal to precision of 10 decimals, stop the increments.
				return null;
			}

			//Calculate shorter route to the targetAngles.
			if(Math.abs(pieTargetAngles[0] - sourceAngles[0]) > Math.PI){
				if(pieTargetAngles[0] < sourceAngles[0])
					pieTargetAngles[0] += 2 * Math.PI;
				else
					sourceAngles[0] += 2 * Math.PI;
			}

			if(Math.abs(pieTargetAngles[1] - sourceAngles[1]) > Math.PI){
				if(pieTargetAngles[1] < sourceAngles[1])
					pieTargetAngles[1] += 2 * Math.PI;
				else
					sourceAngles[1] += 2 * Math.PI;
			}				

			if(sourceAngles[0] < pieTargetAngles[0])
				sourceAngles[0] = Math.min(sourceAngles[0]+0.1,pieTargetAngles[0]);
			else if(sourceAngles[0] > pieTargetAngles[0])
				sourceAngles[0] = Math.max(sourceAngles[0]-0.1,pieTargetAngles[0]);

			if(sourceAngles[1] < pieTargetAngles[1])
				sourceAngles[1] = Math.min(sourceAngles[1]+0.1,pieTargetAngles[1]);
			else if(sourceAngles[1] > pieTargetAngles[1])
				sourceAngles[1] = Math.max(sourceAngles[1]-0.1,pieTargetAngles[1]);

			return _getPathDescForArcPositions(center,radius,
					_polarToCartesian(center,radius,sourceAngles[0]),
					_polarToCartesian(center,radius,sourceAngles[1]));	

		}
		
		function _getContentPositionForArc(center,radius,arcPoints){
			
			var arcStartAngle = _cartesianToPolar(center,arcPoints[0]).theta,
			arcEndAngle = _cartesianToPolar(center,arcPoints[1]).theta,
			contentAngle = arcStartAngle + (arcEndAngle - arcStartAngle)/2;

			if(Math.abs(arcEndAngle - arcStartAngle) > Math.PI)
				contentAngle -= Math.PI;

			return _polarToCartesian(center,radius*0.7,contentAngle);

		}

		function _setDataAttributes(state,index){

			var self  = this;

			for(var i=0;i<self._pathNodes.length;++i){
					if(state === 'normal')
						self._pathNodes[i].parentNode.setAttribute('data-state',state);
					else if(state === 'expand' && i === index)			
						self._pathNodes[i].parentNode.setAttribute('data-state',state);
					else
						self._pathNodes[i].parentNode.setAttribute('data-state','shrink');
			}			
		}

		function _attachContent(){
			var stats = this.stats,
			contentNodes = this._contentNodes;

			for(var i=0;i<stats.length;i++){
				_attachContentForPie(contentNodes[i],stats[i],this._center,this._radius);
			}
		}

		//Utility functions below

		function _drawPie(index,pathDesc){
			var self = this,
			pathEl = self._pathNodes[index],
			contentEl = self._contentNodes[index],
			translateTo = '';

			pathEl.setAttribute('d',pathDesc);

			contentPoints = _getContentPositionForArc(self._center,self._radius,_getArcCoordinates(pathEl));
			translateTo = (contentPoints.x) + 'px,'  + (contentPoints.y) + 'px';			

			_setTransformProp(contentEl,'translate',translateTo);			
		}

		function _attachContentForPie(el,stats,center,radius){

			var details = stats.details;			

			var centerCircleEl = el.closest('svg').querySelector('g.center-group');

			var icon = _createSVGElement('text',{
				'font-family':'FontAwesome',
				'x':'0',
				'y':'0',				
				'fill':'white',
				'text-anchor':'middle',
				'dominant-baseline':'central'
			}),
			iconGroup = _createSVGElement('g',{
				'class':'icon-group'
			});
			
			icon.textContent = stats.icon;
			iconGroup.appendChild(icon);

			el.appendChild(iconGroup);

			for(var key in details){
				
				var detailGroup = _createSVGElement('g'),
				background = _createSVGElement('circle'),				
				detailEl;

				if(typeof details[key].image !== 'undefined'){

					detailEl = _createSVGElement('image',{
							width: '43px',
							height: '43px',
							x:'-21.5',
							y: '-21.5',
							// 'clip-path':'url(#detailClipPath)'
						
						});

					detailEl.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',details[key].image);
					
					detailGroup.addEventListener('click',function(currentKey){
						
						return function(event){

							if(event.currentTarget.closest('g[data-state="shrink"]') ||
								event.currentTarget.closest('g[data-state="normal"]')){								
								return true;
							}

							_setStateForCenter(centerCircleEl,'image',{
								image: details[currentKey].image,
								subhead: details[currentKey].label,
								detail: currentKey+','+stats.name
							});
							return false;
						};
						
					}(key));

				}else{

					detailEl = _createSVGElement('text',{
						'text-anchor':'middle',
						'dominant-baseline':'central'
					});

					detailEl.textContent = details[key].toUpperCase();

					detailGroup.addEventListener('click',function(currentKey){
						
						return function(event){

							if(event.currentTarget.closest('g[data-state="shrink"]') ||
								event.currentTarget.closest('g[data-state="normal"]')){								
								return true;
							}

							_setStateForCenter(centerCircleEl,'text',{
								head:details[currentKey],
								subhead: currentKey,
								detail: stats.name
							});
							return false;
						};

					}(key));					
				}

				background.setAttribute('fill','transparent');
				background.setAttribute('r','22.5');				
				background.setAttribute('opacity','0.9');				

				detailGroup.appendChild(background);
				detailGroup.appendChild(detailEl);
				detailGroup.classList.add('detail');
				
				el.appendChild(detailGroup);
			}

		}

		function _renderContentForPie(el,center,radius,animations){

			var detailsGroupEl = el.querySelectorAll('g.detail'),
			offsetAngle = parseFloat(el.closest('g.outer-group').getAttribute('data-offset-angle')),
			arcPoints = _getArcCoordinates(el.parentNode.querySelector('path')),
			arcStartAngle = _cartesianToPolar(center,arcPoints[0]).theta,
			arcEndAngle = _cartesianToPolar(center,arcPoints[1]).theta,			
			dividingAngle = Math.abs(arcEndAngle - arcStartAngle), 
			centerCoordinates = _getContentPositionForArc(center,radius,arcPoints),
			centerAngle = _cartesianToPolar(center,centerCoordinates).theta;

			if(Math.abs(arcEndAngle - arcStartAngle) > Math.PI){
				dividingAngle = 2*Math.PI - dividingAngle;
			}

			dividingAngle = dividingAngle/(detailsGroupEl.length + 1);	
			dividingAngle = dividingAngle * 1.25; //spacing out the detail icons.

			for(var i=0;i<detailsGroupEl.length;i++){

				var detailGroup = detailsGroupEl[i],
				angle = centerAngle - (i - Math.floor(detailsGroupEl.length/2)) * dividingAngle;

				if(angle < -2*Math.PI)
					angle += 2 * Math.PI;

				position = _polarToCartesian(center,radius * 0.7, angle);
				position.x += detailGroup.clientWidth/2;
				position.y += detailGroup.clientHeight/2;

				_setTransformProp(detailGroup,'translate',(position.x - centerCoordinates.x)+'px, ' + (position.y - centerCoordinates.y)+'px');
				_setTransformProp(detailGroup,'rotate',(-1 * offsetAngle) + 'deg');

				if(detailGroup.lastElementChild.tagName === 'animate')
					detailGroup.lastElementChild.remove();

				detailGroup.appendChild(animations[0].cloneNode());				
			}

			//TODO: Animate the details in after positioning.
		}

		function _hideContentForPie(el,animation){
			var detailsGroupEl = detailsGroupEl = el.querySelectorAll('g.detail');

			for(var i=0; i < detailsGroupEl.length; i++){
				if(detailsGroupEl[i].lastElementChild.tagName === 'animate')
					detailsGroupEl[i].lastElementChild.remove();

				detailsGroupEl[i].appendChild(animation.cloneNode());
			}
		}


		function _getPathDescForArcPositions(center, radius, startPoint, endPoint) {
			var points = 'M' + center.x + ',' + center.y;

			points += ' L ' + startPoint.x + ' ' + startPoint.y;

			points += ' A ' + radius + ' ' + radius +
				' 1 0 1 ' + endPoint.x + ' ' + endPoint.y;
			
			points += ' L ' + center.x + ' ' + center.y;
			points += ' Z';

			return points;
		}

		function _polarToCartesian(center,radius,angle){
			return {
				x: center.x + (Math.cos(angle) * radius),
				y: center.y - (Math.sin(angle) * radius)	
			};	
		}

		function _cartesianToPolar(center,point){

			var theta = Math.atan2(point.y - center.y,point.x - center.x);

			if(theta > 0)
				theta *= -1; 
			else if(theta < 0)
				theta = -1 * (2*Math.PI + theta);

			return {
				r: Math.sqrt(Math.pow(point.y - center.y,2) + Math.pow(point.x - center.x,2)),
				theta: theta
			};	
		}

		function _getArcCoordinates(pathEl){

			//Need to use data-attributes to get these co-ordinates instead of parsing the desc attribute.	
			var desc = pathEl.getAttribute('d'),
			startPoints = desc.split('L ')[1].split(' A')[0].split(' '),
			endPoints = desc.split('1 0 1 ')[1].split(' L')[0].split(' ');

			return [{
				x: parseFloat(startPoints[0]),
				y: parseFloat(startPoints[1])
			},{
				x: parseFloat(endPoints[0]),
				y: parseFloat(endPoints[1])
			}];
		}		

		function _createSVGElement(tag, attrs) {
			var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
			
			if(attrs){
				for (key in attrs)
					el.setAttribute(key, attrs[key]);				
			}
			
			return el;
		}

		function _addDefinition(svgEl,defEl){
			var defs = svgEl.querySelectorAll('defs')[0];

			if(!defs || defs.length === 0){
				defs = svgEl.appendChild(_createSVGElement('defs'));
			}
			defs.appendChild(defEl);
		}

		function _setTransformProp(el,prop,value){

			var currentTransform = el.style.transform,
			targetTransform;

			if(currentTransform === undefined)
				currentTransform = el.style.webkitTransform;
			 
			if(currentTransform === undefined)
				currentTransform = el.style.MozTransform;
					


			if(currentTransform.indexOf(prop) === -1)
				targetTransform = currentTransform + prop + '(' + value + ')';
			else{
				var oldValue = currentTransform.split(prop+'(')[1]
								.split(')')[0];
				targetTransform = currentTransform.replace(oldValue,value);
			}

			el.style.webkitTransform = el.style.transform = targetTransform;

		}

		function _requestAnimationFrame(callback){
			var requestAnimationFrame = window.requestAnimationFrame
			    || window.webkitRequestAnimationFrame
			    || window.mozRequestAnimationFrame
			    || window.msRequestAnimationFrame
			    || function(callback) { return setTimeout(callback, 1000 / 60); };

			    requestAnimationFrame(callback);
		}
}

window.onload = function() {

	//Create implementation of closest() for Safari.
	(function (ELEMENT) {
		ELEMENT.matches = ELEMENT.matches
			|| ELEMENT.msMatchesSelector
			|| ELEMENT.mozMatchesSelector
			|| ELEMENT.webkitMatchesSelector;

		ELEMENT.closest = ELEMENT.closest || function (selector) {
			var node = this;

			while (node) {
				if (node.matches(selector)) {
					break;
				}
				node = node.parentElement;
			}

			return node;
		};
	}(Element.prototype));


	var graphicWrapper = document.getElementById('graph'),
		graphic = new PieInfographic([{
			color: '#5793F3',
			icon: 'Blockchain',
			// name: 'Blockchain',
			details: {
				'BlockChain':'', 
			
			
			}
		}, {
			color: '#DD4D79',
			icon: 'Exchange',
			name: 'Exchange',
			details: {
				'Exchange':'', 
						
			}			
		}, {
			color: '#BD3B47',
			icon: 'Dapp Wallet',
			name: 'Dapp Wallet',
			details: {
				'Dapp Wallet':'', 
				
			}			
		}, {
			color: '#DD4444',
			icon: 'Extension',
			name: 'Extension',
			details: {
				'Extension':'', 
						
			}			
		}, {
			color: '#FD9C35',
			icon: 'Swap Engine',
			name: 'Swap Engine',
			details: {
				'Swap Engine':'', 
			
			}			
		}, {
			color: '#FEC42C',
			icon: 'Cross Chain',
			name: 'Cross Chain',
			details: {
				'Cross Chain':'', 
				
			}			
		}, {
			color: '#D4Df5A',
			icon: 'Crypto Banking',
			name: 'Crypto Banking',
			details: {
				'Crypto Banking':'', 
				
			}			
		}, {
			color: '#5578C2',
			icon: 'NFT Market Place',
			name: 'NFT Market Place',
			details: {
				'NFT Market Place':'', 
				
			}			
		}]);

	graphic.render(graphicWrapper);
};