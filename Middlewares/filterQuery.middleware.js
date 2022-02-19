const filterByModel = (model, populate) => async (req, res, next) => {
    try {
        const reqQuery = { ...req.query };
        console.log( reqQuery);
        const filters = ["select", "sort", "page", "limit"];

        //isolate filters from request query
        filters.forEach(filter => {
            delete reqQuery[filter];
        });

        // let queryStr = JSON.stringify(reqQuery);

        let query = model.find(reqQuery);

        //SELECT filters
        if (req.query.select) {
            //get selected fields
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        //SORT filters
        if (req.query.sort) {//if the user provided a sort query
            //get fields to sort by accordingly 
            const sortBy = req.query.sort(',').join(' ');
            query = query.sort(sortBy);
        } else {//if not, sort by date of creation desc
            query = query.sort('-createdAt');
        }


        //PAGINATION
        const page = parseInt(req.query.page, 10) || 1,
            limit = parseInt(req.query.limit, 10) || 0,
            startIdx = (page - 1) * limit,  //starting cursor
            endIdx = page * limit, //ending cursor
            total = await model.countDocuments();

        /* PAGINATION DEMO
            http://localhost:3000/products?page=2&limit=4
    
            pagination = {
                prev: { //=> prev page no. & the documents' count
                    page:1,
                    limit:4,
                },
                next:{//=> next page no. & the documents' count
                    page:3,
                    limit:4,
                }
            }
        */

        query = query.skip(startIdx).limit(limit);

        const pagination = {};

        //as long as the end index is less than the total document count in the database=>
        //show pagination.next
        //otherwise don't show it (i.e. stop .next when there's no more next)
        if (endIdx < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        //as long as the start index is not 0 (i.e. not the first page)=>
        //show pagination.prev
        //otherwise don't show it (i.e. stop .prev when you are on the 1st page)
        if (startIdx > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        if (populate) {
            query = query.populate(populate);
        }
        const results = await query;

        if (!results) {
            return res.status(404).send({
                success: false,
                message: 'No Data Found',
                data: null
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Data Fetched SUCESSFULLY',
            count: results.length,
            pagination,
            data: results
        })

        next();
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: 'Internal Server Error While Fetching Data',
            data: err
        })
    }

}


export default filterByModel;