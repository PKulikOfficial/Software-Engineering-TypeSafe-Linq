import { Query, LazyQuery } from './query'
import { Fun, pickMany} from '../utils/utils'

export interface Table<T> {
    Select: <K extends keyof T>(...props: Array<K>) => Query<T,Pick<T,K>>
}

export const Table = <T>(array: Array<T>) : Table<T> => ({
    Select: function<K extends keyof T>(...props: Array<K>): Query<T,Pick<T,K>> {
        return Query(array,array.map(r => pickMany(r,props)))
    }
})

export interface LazyTable<T> {
    Select: <K extends keyof T>(...props: Array<K>) => LazyQuery<T,Pick<T,K>>
}

export const LazyTable = <T>(): LazyTable<T> => ({
    Select: <K extends keyof T>(...props: Array<K>): LazyQuery<T,Pick<T,K>> =>
        LazyQuery(Fun(array => array.Select(...props)))
})