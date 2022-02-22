import expressJWT from 'express-jwt';

const protect = (req, res,next)=>{
        const secret = process.env.JWT_SECRET;
        const api = '/api/v1';

        return expressJWT({
            secret,
            algorithms: ['HS256'],
            isRevoked: isRevoked
        }).unless({
            path: [
                `${api}/auth/login`,
                `${api}/auth/signup`,
                {url: /\/api\/v1\/products(.*)/ , methods:['GET', 'OPTIONS'] },
                {url: /\/api\/v1\/orders(.*)/ , methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] },
                {url: /\/api\/v1\/categories(.*)/ , methods:['GET', 'OPTIONS'] },
                

            ]
        })

        next();



}

const isRevoked = (req, payload, done)=>{
    if(!payload.isAdmin) done(null, true);

    done();
}

export default protect;