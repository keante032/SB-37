const { BadRequestError } = require("../expressError");

/** Receives two objects.
 *  dataToUpdate could have the properties of the user or company classes
 *  jsToSql would have just those properties whose names are different in JS vs SQL
 *  (probably camelCase vs low_dash)
 *  Returns an object with the SQL column names that need to be updated,
 *  and the values to update there.
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
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
