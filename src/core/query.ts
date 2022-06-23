import { Table } from './table'
import { Fun, pickMany } from '../utils/utils'

export interface Query<T,R> {
    Data: Array<T>
    Result: Array<R>
    Select: <K extends keyof T>(...props: Array<K>) => Query<T,Pick<T,K>>
    Include: <K extends keyof T, T2 extends T[K] extends Array<infer I> ? I : never, K2 extends keyof T2>
        (prop: K, query: (q: Table<T2>) => Query<T2,Pick<T2,K2>>) =>
        Query<T, Pick<T,K>>
}

export const Query = <T,R>(Data: Array<T>, Result: Array<R> ) : Query<T,R> => ({
    Data: Data,
    Result: Result,
    Select: function<K extends keyof T>(...props: Array<K>): Query<T,Pick<T,K>> {
        let resultProps = Object.keys(this.Result[0])       
        let newProps = [...resultProps, ...props] as unknown as K[]
        return Query(Data, Data.map(r => pickMany(r,newProps)))
    },
    Include: function<K extends keyof T, T2 extends T[K] extends Array<infer I> ? I : never, K2 extends keyof T2>
        (prop: K, query: (q: Table<T2>) => Query<T2,Pick<T2,K2>>): Query<T, Pick<T,K>> {

        let subquery = Data.map(e => ({ [prop]: query(Table(e[prop]as any)) } as any))
        let subqueryData: any[] = [];
        for(var i = 0; i < subquery.length; i++ ){
            subqueryData = [[subquery[i][prop.toString()].Result], ...subqueryData]
        }
        subqueryData.reverse()

        let finaldata: any[] = []
        let newObj = null
        for(var j = 0; j < subquery.length; j++ ){
            newObj = Object.assign({},Result[j],  {[prop]: subqueryData[j][0]})
            finaldata = [...finaldata, newObj]
        }
        return Query(Data,finaldata)
    }
})

export interface LazyQuery<T,R> {
    Data: (array: Table<T>) => Array<T>,
    From: (array: Table<T>) => Array<R>
    Select: <K extends keyof T>(...props: Array<K>) => LazyQuery<T,Pick<T,K>>
    Include: <K extends keyof T, T2 extends T[K] extends Array<infer I> ? I : never, K2 extends keyof T2>
        (prop: K, query: (q: Table<T2>) => Query<T2,Pick<T2,K2>>) =>
        LazyQuery<T, Pick<T,K>>
}

export const LazyQuery = <T,R>(query: Fun<Table<T>, Query<T,R>>): LazyQuery<T,R> => ({
    Data: (_) => query(_).Data,
    From: (array: Table<T>) => query(array).Result,
    Select: <K extends keyof T>(...props: Array<K>): LazyQuery<T,Pick<T,K>> =>
        LazyQuery(query.Then(Fun(array => array.Select(...props)))),
    Include: <K extends keyof T, T2 extends T[K] extends Array<infer I> ? I : never, K2 extends keyof T2>
        (prop: K, subquery: (q: Table<T2>) => Query<T2,Pick<T2,K2>>) =>
        LazyQuery(query.Then(Fun(array => array.Include(prop, subquery))))
})