interface Fun<input,output>{
    (_:input) : output,
    then<finalOutput>(postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput>
}

const then = <input, intermediateOutput, output>(
    first:Fun<input,intermediateOutput>,second:Fun<intermediateOutput,output>) : Fun<input,output> =>
    fun((input:input) => second(first(input))
)

const fun = <input,output>(f:(_:input) => output) : Fun<input,output> => {
    const fDecorated = f as Fun<input,output>
    fDecorated.then = function<finalOutput>(this:Fun<input, output>, postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput> {
    return then(this, postProcess)
    }
    return fDecorated
}
