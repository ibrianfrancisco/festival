(function() {
'use strict';


  angular.module('app')
  .controller('ShowController', ShowController);

  ShowController.$inject = ['$stateParams', 'Festival'];

  function ShowController($stateParams, Festival) {
    var vm = this;

    vm.timeline = ["0:00", "1:00", "2:00",
                   "3:00", "4:00", "5:00",
                   "6:00", "7:00", "8:00",
                   "9:00", "10:00", "11:00",
                   "12:00","13:00", "14:00",
                   "15:00", "16:00", "17:00",
                   "18:00", "19:00", "20:00",
                   "21:00", "22:00", "23:00"];

    vm.festival = Festival.get({id: $stateParams.id});

    vm.addStage = function() {
      Festival.addStage({festId: vm.festival._id, stageName: vm.stageName}, function(festival) {
        vm.festival = festival;
        $('#stage-input').val('');
      });
    }

    vm.addAct = function(stage) {
      Festival.addAct({
        stageId: stage._id,
        artistName: vm.artistName,
        actStartTime: vm.actStartTime,
        actEndTime: vm.actEndTime
      }, function(festival) {
        vm.festival = festival;
        $('#artist-name').val('');
      });
    }

    vm.leftOffset = function (dateStr) {
      var offsetPerHour = 1072/12;
      var dt = new Date(dateStr);
      var baseDate = new Date(dateStr).setHours(0, 0, 0, 0);
      var hrs = (dt - baseDate) / (1000 * 60 * 60);
      return (hrs * offsetPerHour) + 'px';
    }

    vm.actWidth = function (act) {
      var widthPerHour = 1072/12;
      var diff = (new Date(act.actEndTime).getTime() - new Date(act.actStartTime).getTime());
      diff = diff / (1000 * 60 * 60);
      return (diff * widthPerHour) + 'px';
    }

    vm.formatTime = function(dateStr) {
      var dt = new Date(dateStr);
      return (dt.getHours()) + ':' + ('0' + dt.getMinutes()).slice(-2);
    }

  }

})();
