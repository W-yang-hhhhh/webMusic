import Datastore from 'nedb'
import path from 'path'


export default new Datastore({
    filename:'./data.db',
    autoload:true
})
