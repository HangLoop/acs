'use strict';

angular.module('app.home').controller('mapDashboardCtrl', ['$scope', 'customerBookingRecord', function($scope, customerBookingRecord) {
    //Change status button color in map filter
    $scope.selectStatus = function() {
        jQuery('.btn-normal').click(function() {
            jQuery(this).toggleClass('btn-selected');
        });
    };
    $scope.selectStatus();

    //Datepicker
    $scope.pickeddate = new Date();
    jQuery("#datepicker").datepicker({
        //changeMonth: true, 
        //changeYear: true,
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>',
        onSelect: function() {
            $scope.pickeddate = $(this).datepicker('getDate');
        }
    });

    //search record data
    customerBookingRecord.success(function(records) {
        $scope.booking = records;
    });

    //Display Tier's icon according to member's tier
    $scope.tierClass = function(record) {
        switch (record.customer.tier) {
            case 'VVIP':
                return 'fa fa-trophy';
                break;
            case 'VIP':
                return 'fa fa-star-half-o';
                break;
            default:
                return 'fa fa-user-secret';
        }
    };

    //Select booking record and display it by directive selectedRecords
    $scope.enableSelectedRecords = false;
    $scope.selectRecord = function(i) {
        $scope.enableSelectedRecords = true;
        $scope.currentIdx = $scope.booking[i];
    };

    //Hand Band ID and locker
    $scope.handBandLocker = [{
        "handBandId": "Please Select",
        "lockerId": ""
    }, {
        "handBandId": "HB001",
        "lockerId": "01"
    }, {
        "handBandId": "HB002",
        "lockerId": "02"
    }, {
        "handBandId": "HB003",
        "lockerId": "03"
    }, {
        "handBandId": "HB004",
        "lockerId": "04"
    }, {
        "handBandId": "HB005",
        "lockerId": "05"
    }, {
        "handBandId": "HB006",
        "lockerId": "06"
    }, {
        "handBandId": "HB007",
        "lockerId": "07"
    }, {
        "handBandId": "HB008",
        "lockerId": "08"
    }];
    $scope.selectedItem = $scope.handBandLocker[0];
    $scope.selectedItemCO = $scope.handBandLocker[0];

    $scope.selectedHandBand = false;
    $scope.selectHandBand = function() {
        $scope.selectedHandBand = true;
    };

}]);
