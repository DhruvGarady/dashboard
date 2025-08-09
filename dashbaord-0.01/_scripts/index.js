var parentFeatures;
$(function(){
	
	sessionStorage.setItem("MENU_COLLAPSE","FULL")

	strURL = request_url + "/feature/getFeature";
	features = getAPIdata(strURL)


	_.each(features, function(item){
		
		item.feature_name = item.feature_name.toLowerCase();
		
		if(item.parent_feature_id != null && item.parent_feature_id != undefined && item.parent_feature_id != ""){
			item.isParentFeature = 'N';	
		}else{
			item.isParentFeature = 'Y';
			item.childFeatures = [];
		}
	});

	childFeatures = _.reject(features, function(item){
		return item.isParentFeature == 'Y';
	})

	parentFeatures = _.reject(features, function(item){
		return item.isParentFeature == 'N';
	})

	_.each(parentFeatures, function(pitem){
		_.each(childFeatures, function(citem){
				if(pitem.id == citem.parent_feature_id){
					pitem.childFeatures.push(citem)
				}
		})
	})

	sessionStorage.setItem('FEATURES',JSON.stringify(parentFeatures))



})







