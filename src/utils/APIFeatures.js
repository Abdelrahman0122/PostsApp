

export default class APiFeatures{

    constructor(mongooseQuery, queryString){
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    pagination(){
       let page = this.queryString.page*1||1
       if(this.queryString.page <=0)page = 1 
       let skip = (page-1) * 4 
       this.page = page;
       this.mongooseQuery.skip(skip).limit(100)
       return this;
    }
 
    filter(){
        let filterObj = {...this.queryString}
        let excludedQuery = ["page","fields","sort","keyword"]
        excludedQuery.forEach((q)=>{
          delete filterObj[q]
        }); 
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
        filterObj = JSON.parse(filterObj)
        this.mongooseQuery.find(filterObj)
        return this;
    }

    sort(){
        if(this.queryString.sort){
            let sortBy = this.queryString.sort.split(",").join(" ") 
            this.mongooseQuery.sort(sortBy)
        }
        return this;
    }

    search(){
        if(this.queryString.keyword){
            this.mongooseQuery.find({$or:[{body:{$regex:this.queryString.keyword,$options:"i"}},{description:{$regex:this.queryString.keyword,$options:"i"}}]})
        }
        return this; 
    }

    fields(){
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(",").join(" ") 
            this.mongooseQuery.select(fields)
        }
        return this;
    }

}