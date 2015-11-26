;(function($){
    var defaults =
	 {
	     ShowMessage:true,
	     Message: "Duplicates are found.",
	     Focus: true
	 };

    $.fn.SM_Duplicate_Validate = function (options) {
        var config = $.extend({}, defaults, options);

        var Grid = this;
        var GridID = this.attr('id');
        console.log(GridID);
        var ValidationGroups = [];
        $('#' + GridID + ' tr').each(function () {
            $(this).find("[validate-group]").each(function () {
                ValidationGroups.push($(this).attr('validate-group'));
            });
        });
        ValidationGroups = $.unique(ValidationGroups);

        var isError = false;

        for (var a = 0; a <= ValidationGroups.length; a++) {
            var arr = [];
            var i = 0;
            $('#' + GridID + ' tr').each(function () {
                var CurrentArrayVal = "";
                $(this).find('[validate-group="' + ValidationGroups[a] + '"]').each(function () {
                    var inputVal = $(this).val();
                    console.log(ValidationGroups[a]);
                    $(this).css('border', '1px solid gray');
                    if (inputVal != "") {
                        CurrentArrayVal = CurrentArrayVal + "-" + inputVal;
                    }
                });
                if ((CurrentArrayVal != "") && (CurrentArrayVal != "0") && CurrentArrayVal != "-0") {
                    arr.push(CurrentArrayVal);
                }
                i = i + 1;
            });

            var Duplicates = isDuplicate(arr);
            if (Duplicates != "")
            {
                isError = true;
                if (config.Focus == true) {
                    for (var i = 0; i < Duplicates.length; i++) {
                        var Row = Duplicates[i];
                        var Values = Row.split('-');
                        for (var b = 0; b < Values.length; b++) {
                            $('#' + GridID + ' tr').each(function () {
                                $(this).find('[validate-group]').each(function () {

                                    if (($(this).val() != "") && $(this).val() != "0") {
                                        if ($(this).val() == Values[b]) {
                                            $(this).css('border', '1px solid red');
                                        }
                                    }
                                });
                            });
                        }
                    }
                }
            }

        }

        if (isError == true)
        {
            if (config.ShowMessage == true) {
                alert(config.Message);
            }
        }

        function isDuplicate(arrInput) {
            var results = [];
            var sorted_arr = arrInput.sort();
            for (var i = 0; i < arrInput.length - 1; i++) {
                if (sorted_arr[i + 1] == sorted_arr[i]) {
                    results.push(sorted_arr[i]);
                }
            }
            return results;
        }
        function info(msg) {
            console.info(msg);
        }

    }

}(jQuery));