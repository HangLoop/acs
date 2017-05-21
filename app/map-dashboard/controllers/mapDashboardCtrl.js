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
        angular.forEach($scope.booking, function(itm) { itm.selected = toggleStatus; });

    }

    $scope.optionToggled = function() {
        $scope.isAllSelected = $scope.booking.every(function(itm) {
            return itm.selected;
        })
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

    //alert box
    $scope.eg5 = function() {

        $.smallBox({
            title: "Warning!",
            content: "<div class='alert-box'>Member go inside Private Room!</div",
            color: "#C79121",
            //timeout: 8000,
            icon: "fa fa-bell swing animated"
        });
    };

    //Map filter pop-up and assign ID to the room
    $scope.filterPopup = function() {
        jQuery('.map-filter-container').toggle();
        $('.leaflet-marker-icon').each(function() {
            var rmID = $("span:contains('Rm')", this).text().toLowerCase().replace(" ", "_");;
            $(this).attr('id', rmID);
        });
        console.log("assing ID !");
    }

    $scope.fillPath = function() {
        if ($(".leaflet-interactive:nth-child(4)").attr("fill") === "#BFE7E7") {
            $(".leaflet-interactive:nth-child(4)").attr("fill", "green");
        } else {
            $(".leaflet-interactive:nth-child(4)").attr("fill", "#BFE7E7");
        }
        

    };
    
    $scope.addBookingNo = function() {
        $("<span class='rm-booking-number'>15</span><br>").insertBefore(".leaflet-marker-icon span:contains('Rm')"); 
    }

    //Room type data
    $scope.occupiedRm = ['vip_rm1', 'vvip_rm2', 'vvip_rm3', 'vvip_rm4', 'vvip_rm5'];
    $scope.confirmedBk = ['rm6', 'rm7', 'rm14', 'vvip_rm1'];
    $scope.availableRm = ['rm20', 'rm21', 'rm22', 'rm23'];
    $scope.notAvailableRm = ['rm1','rm2','rm3'];

    //Show selected room type
    $scope.showOccupied = function() {
        $('#' + $scope.occupiedRm.join(',#')).toggleClass('rmOccupied-sel');
    }
    $scope.showConfirmed = function() {
        $('#' + $scope.confirmedBk.join(',#')).toggleClass('rmConfirmed-sel');
    }
    $scope.showAvailableRm = function() {
        $('#' + $scope.availableRm.join(',#')).toggleClass('rmAvailable-sel');
    }
    $scope.showNotAvailableRm = function() {
        $('#' + $scope.notAvailableRm.join(',#')).toggleClass('rmNotAvailable-sel');
    }


    //Validate Booking record mbr_code
    $scope.validSelectedBk = function() {
        
    }


}]);

/*
<span>Rm49</span>
<br><span style="font-size:20px">10</span></div>
*/
