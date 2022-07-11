
const { ErrorWithProps } = require('mercurius')

export class BussinesException {

    public static UndefinedReturnedValue(): typeof ErrorWithProps {
        return new ErrorWithProps('Value', {
            code: 'UNDEFINED_RETURNED_VALUE',
            timestamp: Math.round(new Date().getTime() / 1000)
        })
    }
}