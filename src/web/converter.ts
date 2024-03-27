export function convertToNet(uuid: string) {
	const a = [...uuid];

	const cvt = a[6] + a[7] + a[4] + a[5] + a[2] + a[3] + a[0] + a[1] + '-' + a[10] + a[11] + a[8] + a[9] + '-' + a[14] + a[15] + a[12] + a[13] + '-' + a[16] + a[17] + a[18] + a[19] + '-' + uuid.substr(20);
	const result = cvt.toLowerCase();

	return result;
}

export function convertToRaw(uuid: string) {
	const a = [...uuid];

	const cvt = a[6] + a[7] + a[4] + a[5] + a[2] + a[3] + a[0] + a[1] + a[11] + a[12] + a[9] + a[10] + a[16] + a[17] + a[14] + a[15] + a[19] + a[20] + a[21] + a[22] + uuid.substr(24);
	const result = cvt.toUpperCase();

	return result;
}


