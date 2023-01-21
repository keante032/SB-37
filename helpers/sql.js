const { BadRequestError } = require("../expressError");

/**
 * Handles creating the variable portion of a SQL UPDATE query, whatever the columns involved may be.
 * @param   {Object}  dataToUpdate  The keys should match properties of either the user or company models, depending on what we're updating.
 * @param   {Object}  jsToSql       For any cases where JS property name doesn't match SQL column name, keys are JS version (camelCase), values are SQL version (low_dash).
 * @returns {Object}                .setCols is one string for all the column names, ready to be inserted in SQL query, and .values is an array of the values to be set in the database.
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql={}) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
