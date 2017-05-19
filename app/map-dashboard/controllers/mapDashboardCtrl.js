'use strict';

angular.module('app.home').controller('mapDashboardCtrl', ['$scope', 'customerBookingRecord', '$sce', function($scope, customerBookingRecord, $sce) {
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

    //record data
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
        //$scope.currentIdx = $scope.booking[i];
    };

    //Select all
    $scope.toggleAll = function() {
     var toggleStatus = $scope.isAllSelected;
     angular.forEach($scope.booking, function(itm){ itm.selected = toggleStatus; });
   
    }
      
    $scope.optionToggled = function(){
        $scope.isAllSelected = $scope.booking.every(function(itm){ return itm.selected; })
    }
        
    //Mark as friend
    $scope.markAsFriendBtn = "Mark as friend";
    $scope.markAsFriend = function() {
        var input = jQuery('#name-on-map');
        var text = input.val();

        if (text && text.indexOf("(friend)") < 0) {
            input.val(text + " (friend)");
            $scope.markAsFriendBtn = "Remove friend";
        } else { 
            input.val(text.replace(" (friend)", ""));
            $scope.markAsFriendBtn = "Mark as friend";
        }
        
    };


    //Hand Band ID and locker
    $scope.handBandLocker = [{
        "handBandId": "Please Select",
        "lockerId": ""
    }, {
        "handBandId": "BBtest1",
        "lockerId": "01"
    }];
    $scope.selectedItem = $scope.handBandLocker[0];
    $scope.selectedItemCO = $scope.handBandLocker[0];

    $scope.selectedHandBand = false;
    $scope.selectHandBand = function() {
        $scope.selectedHandBand = true;
    };

    //Pop-up map filter
    $scope.filterPopup = function() {
        jQuery('#btn-filter').click(function() {
            jQuery('.map-filter-container').toggle();
        });
    }
    $scope.filterPopup();

    //alert box
    $scope.eg5 = function() {

        $.smallBox({
            title: "Ding Dong!",
            content: "<div class='alert-box'>Someone's at the door...shall one get it sir?</div",
            color: "#C79121",
            //timeout: 8000,
            icon: "fa fa-bell swing animated"
        });
    };

    $scope.fillPath = function() {
        $(".leaflet-interactive:nth-child(4)").attr("fill", "green");
    };
    $scope.fillPath();
}]);
