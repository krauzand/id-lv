function IdeLve () {
	/**
	 * Validates personal identification code issued by Republic of Latvia
	 * @param identificationCode string - Identification code.
	 * @returns error codes if identificationCode is not valid.
	 */
	this.validateIdentificationCode = function (identificationCode) {
		let errorCodes = [];

		if (identificationCode.length > 12) {
			errorCodes.push("too-long");
			return errorCodes;
		}

		// check basic pattern (123456-78901)
		let pattern = new RegExp("(\\d{6})-(\\d{4})(\\d)");

		let match = pattern.exec(identificationCode);
		if (match === null) {
			errorCodes.push("invalid-code");
			return errorCodes;
		}

		// check checksum digit
		let identificationCodeWithoutDash = match[0].replace("-", "");
		let checkSumDigits = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		let checkSum = 0;
		let checkDigit = +match[3];

		for (let index in checkSumDigits) {
			if (checkSumDigits.hasOwnProperty(index)) {
				checkSum += ((+identificationCodeWithoutDash.charAt(+index)) * (+checkSumDigits[+index]));
			}
		}
		checkSum = (1 - checkSum) % 11;
		checkSum += (checkSum < -1) ? 11 : 0;

		//checksum should match last digit
		if (checkSum !== checkDigit) {
			errorCodes.push("invalid-code-bad-checksum");
		}

		return errorCodes;
	}

	/**
	 * Check if identification code is valid
	 * @param identificationCode
	 * @returns {boolean}
	 */
	this.isValidIdentificationCode = function (identificationCode) {
		return !this.validateIdentificationCode(identificationCode).length > 0;
	}

}
