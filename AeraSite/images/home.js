// JavaScript Document

var Aera = {

	config: {
	
		updateOnAjax: false,
		ajaxCacheOn: false	

	},

	classes: {},
	page: null,
	UI: {},
	mediator: null,
	storage: null,
	singletonEnforcer: null,
	ajaxCache: null,
	ajax: null,

	bootstrapper: function(){

		Aera.mediator.broadcast('initialize');
		Aera.mediator.broadcast('cleanup');

		delete Aera.bootstrapper;
	
	}

};


Aera.classes.SingletonEnforcer = function(){

    if(Aera.singletonEnforcer) return Aera.singletonEnforcer;

    var singletons = [];

    function register(name, obj){

        singletons[name] = obj;

    }

    function get(name){

        if(singletons[name]){

            return singletons[name];

        }else{

            return false;

        }

    }

    var objInterface = {register: register, get: get};
    Utils.model.freeze(objInterface);

    return objInterface;

}

Aera.singletonEnforcer = new Aera.classes.SingletonEnforcer();

Aera.classes.RecentActivity = function(){

	if(Aera.singletonEnforcer.get('recentactivity')) return Aera.singletonEnforcer.get('recentactivity');

	var self = this;
	var numActivities = 0;    
	var queuedActivities = [];
	var curIndex = 0;
	var ulContainer = null;
	var interval = null;
	var retrievedActivities = false;

	var getActivities = function(){

		if(retrievedActivities) return;
		
		$.ajax({

			url: '/?/home/recent_activity',
			type: 'post',
			data: null,
			expiration: 5,
			success: function(data){
                
				if(data.indexOf('<html') != -1 || data.indexOf('Fatal Error') != -1){

					$('.bg-recent').removeClass('ra-loading').append('<h3> Error loading recent activity. </h3>');
					return;
				}

				formatData(data);
				retrievedActivities = true;
			},

			error: function(xhr, err){

				$('.bg-recent').removeClass('ra-loading').append('<h3> Error loading recent activity. </h3>');

			}

		});

	}

	var formatData = function(data){
			
		queuedActivities = data.split('</li>').slice(0,-1);
	
		numActivities = queuedActivities.length;

		for(var i = 0; i<numActivities; i++) queuedActivities[i] += '</li>';

		initContainer();

		$('.bg-recent').removeClass('ra-loading');

	}

	var initContainer = function(){

		for(var i = 0; i<4; i ++){

			ulContainer.append(queuedActivities[i]);
			curIndex++;
		}

		if(numActivities < 4) return;

		interval = setInterval(rotate, 3000);

	}

	var addActivity = function(){

		ulContainer.append(queuedActivities[curIndex]);

	}

	var removeActivity = function(){

		ulContainer.find('li').eq(0).remove();

	}

	var rotate = function(){

		curIndex == numActivities - 1 ? curIndex = 0 : curIndex++;

		addActivity();

		ulContainer.find('li').eq(0).animate({

			marginTop: -58

		}, 350, removeActivity);
	}
	
	this.initialize = function(){
	
		if(!$('.bg-recent').length && !Aera.config.updateOnAjax){

			delete Aera.UI.recentActivity;
			Aera.mediator.unsubscribe('recentactivity');
			return;

		}

		ulContainer = $('.bg-recent').find('ul').eq(0);	
		getActivities();
	}

	this.cleanup = function(){

		delete self.initialize;
		delete self.cleanup;
		Utils.model.freeze(self);

	}

	Aera.singletonEnforcer.register('recentactivity', this);
	Aera.mediator.subscribe('recentactivity', this);
}

Aera.UI.recentActivity = new Aera.classes.RecentActivity();