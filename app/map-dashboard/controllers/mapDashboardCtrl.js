'use strict';

angular.module('app.home').controller('mapDashboardCtrl', ['$scope', function($scope) {
    $scope.selectStatus = function() {
        jQuery('.btn-normal').click(function() {
            jQuery(this).toggleClass('btn-selected');
        });
    };
    $scope.selectStatus();
    $scope.pickeddate = new Date();

    jQuery("#datepicker").datepicker({
    	//changeMonth: true, 
        //changeYear: true,
    	prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onSelect: function() {
            $scope.pickeddate = $(this).datepicker('getDate');
            console.log(dateObject);
        }
    });

}]);	
