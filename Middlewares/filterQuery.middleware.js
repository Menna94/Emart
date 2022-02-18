const filterByModel = (model) => async(req,res,next)=>{
    const reqQuery = {...req.query};

    const filters= ["select", "sort", "page", "limit"];

    //isolate filters from request query
    filters.forEach(filter=>{
        delete reqQuery[filter];
    });

    let queryStr = JSON.stringify(reqQuery);

    let query = model.find(JSON.parse(queryStr));

    //SELECT filters
    if(req.query.select){
        //get selected fields
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //SORT filters
    if(req.query.sort){//if the user provided a sort query
        //get fields to sort by accordingly 
        const sortBy = req.query.sort(',').join(' ');
        query = query.sort(sortBy);
    }else{//if not, sort by date of creation desc
        query = query.sort('-createdAt');
    }


    //PAGINATION
    const pagination = {};
    

    next();
}