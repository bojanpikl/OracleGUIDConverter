import * as converter from '../web/converter';

describe('Converter Tests', () => {
	it('should convert to string', () => {
		const input = '315900cc-8491-4b37-bb1f-4317cb81b7f7';
		const expected = 'CC0059319184374BBB1F4317CB81B7F7';

		expect(converter.convertToRaw(input)).toEqual(expected);
	});


	it('should convert to raw(16)', () => {
		const input = 'CC0059319184374BBB1F4317CB81B7F7';
		const expected = '315900cc-8491-4b37-bb1f-4317cb81b7f7';

		expect(converter.convertToNet(input)).toEqual(expected);
	});
});
