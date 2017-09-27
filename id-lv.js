var IdeLve  = {
	/**
	 * Validates if string is a valid date against a pattern dd.mm.yyyy
	 * @param dateString
	 * @returns {boolean}
	 */
	isValidDate: function (dateString) {
		// First check for the pattern
		if (!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(dateString))
			return false;
		// Parse the date parts to integers
		var parts = dateString.split(".");
		var day = parseInt(parts[0], 10);
		var month = parseInt(parts[1], 10);
		var year = parseInt(parts[2], 10);
		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month === 0 || month > 12)
			return false;
		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		// Adjust for leap years
		if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
			monthLength[1] = 29;
		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	},

	/**
	 * Validates personal identification code issued by Republic of Latvia
	 * @param identificationCode string - Identification code.
	 * @returns error codes if identificationCode is not valid.
	 */
	validateIdentificationCode: function (identificationCode) {
		var pattern;
		var errorCodes = [];
		// check basic pattern (123456-78901)
		pattern = new RegExp("([0-2]\\d|[3][0-1])([0]\\d|[1][0-2])(\\d{2})-([0-2])(\\d{3})(\\d)");

		var match = pattern.exec(identificationCode);
		if (match === null) {
			errorCodes.push("invalid-code");
			return errorCodes;
		}

		//get the century
		var century = "";
		century = ((+match[4]) === 1 ? "19" : (+match[4]) === 2 ? "20" : "18");

		var inputDay = (+match[1]);
		var inputMonth = (+match[2]);
		var inputYear = century + (match[3]);
		if (!IdeLve.isValidDate(inputDay + "." +inputMonth + "." + inputYear)) {
			errorCodes.push("invalid-code-not-valid-date");
			return errorCodes;
		}

		// check checksum digit
		var identificationCodeWithoutDash = match[0].replace("-", "");
		var checkSumDigits = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var checkSum = 0;

		for (var index in checkSumDigits) {
			if (checkSumDigits.hasOwnProperty(index)) {
				checkSum += ((+identificationCodeWithoutDash.charAt(index)) * (+checkSumDigits[index]));
			}
		}
		checkSum = (1 - checkSum) % 11;
		checkSum += (checkSum < -1) ? 11 : 0;

		//checksum should match last digit
		if (checkSum !== +match[6]) {
			errorCodes.push("invalid-code-bad-checksum");
		}
		return errorCodes;
	},

	/**
	 * Check if identification code is valid
	 * @param identificationCode
	 * @returns {boolean}
	 */
  	isValidIdentificationCode: function (identificationCode) {
		return ! IdeLve.validateIdentificationCode(identificationCode).length > 0;
	}

};
