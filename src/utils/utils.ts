export interface Fun<input,output>{
    (_:input) : output,
    Then<finalOutput>(postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput>
}

export const Then = <input, intermediateOutput, output>(
    first:Fun<input,intermediateOutput>,second:Fun<intermediateOutput,output>) : Fun<input,output> =>
    Fun((input:input) => second(first(input))
)

export const Fun = <input,output>(f:(_:input) => output) : Fun<input,output> => {
    const fDecorated = f as Fun<input,output>
    fDecorated.Then = function<finalOutput>(this:Fun<input, output>, postProcess:Fun<output, finalOutput>) : Fun<input,finalOutput> {
        return Then(this, postProcess)
    }
    return fDecorated
}

export const pickMany = <T, K extends keyof T>(entity: T, props: K[]) => {
    return props.reduce((s, prop) => (s[prop] = entity[prop], s) , {} as Pick<T, K>)
}