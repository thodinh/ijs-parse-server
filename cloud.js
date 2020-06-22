Parse.Cloud.define('ijs-schemas', async (req) => {
    if(req.user) {
        Parse.Cloud.useMasterKey()
        let query = new Parse.Query('_SCHEMA')
        if (req.params.select) query.select(req.params.select.split(','))
        return query.find()
    }
    return null;
})