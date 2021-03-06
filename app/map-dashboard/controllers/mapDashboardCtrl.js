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

    //Display different color according to member's grading
    $scope.gradingClass = function(record) {
        switch (record.customer.mbr_group) {
            case 'DCC19':
                return 'txt-color-red';
                break;
            case 'DCC17':
                return 'txt-color-orange';
                break;
            default:
                return 'txt-color-magenta';
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
            content: "<div class='alert-box'>Member stay inside Private Room!</div",
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
    }

    //Display booking number in front of the room name, assume no bookings there 
    $scope.addBookingNo = function() {
        $("<span class='rm-booking-number'>" + 0 + "</span><br>").insertBefore(".leaflet-marker-icon span:contains('Rm')");
    }

    //Room type data
    $scope.occupiedRm = ['vip_rm1', 'vvip_rm2', 'vvip_rm3', 'vvip_rm4', 'vvip_rm5'];
    $scope.confirmedBk = ['rm6', 'rm7', 'rm14', 'vvip_rm1'];
    $scope.availableRm = ['rm20', 'rm21', 'rm22', 'rm23'];
    $scope.notAvailableRm = ['rm1', 'rm2', 'rm3'];

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

    //Toggle collapse
    $scope.toggleCol = function() {
        $('.panel-collapse').collapse('toggle');
    }

    //Validate Booking record mbr_code
    $scope.validSelectedBk = function() {
        var init;
        var notSel = 0;

        for (var i = 0; i < $scope.booking.length; i++) {

            if (!$scope.booking[i].selected) {
                notSel += 1;
            }
            if (notSel === $scope.booking.length) {
                alert("Please select booking record(s)");
                return;
            }

            if ($scope.booking[i].selected) {
                if (!init) {
                    init = $scope.booking[i];
                } else if (init.customer.mbr_code !== $scope.booking[i].customer.mbr_code) {
                    alert("Please select booking records of same member!");
                    return;
                }
            }

        }
        $scope.toggleCol();
    }

}]);