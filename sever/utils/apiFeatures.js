class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log('------from filter in api', queryObj);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Use Knex's where to filter based on queryStr
    const filters = JSON.parse(queryStr);
    this.query = this.query.where(filters);
    // this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      // Use Knex's orderBy method for sorting
      this.query = this.query.orderByRaw(sortBy);
      // this.query = this.query.sort(sortBy);
    } else {
      // Default sorting (change 'createdAt' to your actual created date column)
      this.query = this.query.orderBy('created_at', 'desc');
      // this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');

      this.query = this.query.select(fields);
    } else {
      // Exclude version field (change '-__v' as needed)
      this.query = this.query.select('*');
      // this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // Use Knex's limit and offset methods
    this.query = this.query.limit(limit).offset(skip);
    // this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
export default APIFeatures;
