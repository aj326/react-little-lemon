
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

export function storeDataToDB(menuItems) {
    db.transaction((tx) => {
        tx.executeSql(
            `insert into menuitems (name, description, price, category, image) values ${menuItems.map(
                (item) => `("${item.name}", "${item.description}", "${item.price}", "${item.category}", "${item.image}")`
            )
                .join(', ')}`

            ,

            [], (_, { rows }) => console.log(rows), (_, e) => console.error("error in insert values", e));
    }
    )
}

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists menuitems (id integer primary key not null, name text , description text , image text, price text , category text );",
                [], null, e => console.error("error from create table", e));
        }, reject, resolve);
    });
}

export async function dropTable() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "drop table if exists menuitems",
                [], null, e => console.error("error from drop table", e));
        }, reject, resolve);
    });
}


export async function getDataFromDB() {
    return new Promise((resolve) => {

        db.transaction((tx) => {
            tx.executeSql('select * from menuitems', [], (_, { rows }) => {
                resolve(rows._array);
            });
        });
    });
}


export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
      if (!query) {
        const whereClause = (activeCategories.map(c => (`category="${c}"`)).join(' or '))
        const sqlStatement = `select * from menuitems where ${whereClause}`
        db.transaction((tx) => {
          tx.executeSql(`select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
            [],
            (_, { rows }) => {
              resolve(rows._array);
            },
          );
        },reject);
      } else {
        db.transaction((tx) => {
          tx.executeSql(
            `select * from menuitems where (name like '%${query}%') and (${activeCategories
              .map((category) => `category='${category}'`)
              .join(' or ')})`,
            [],
            (_, { rows }) => {
              resolve(rows._array);
            }
          );
        }, reject);
      }
    });
  }
  