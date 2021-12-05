import { People } from './People';

export interface IPeopleRepository {
  readonly peopleList: Array<People>;

  /**
   * @description Add an instance of People to the list
   *
   * @param {People} people - an instance of People will be added into the people list
   * @return {*}  {number} - the length of this people list after change
   * @memberof IPeopleList
   */
  addPeople(people: People): number;

  /**
   * @description Clear the people list
   *
   * @return {*}  {boolean}
   * @memberof IPeopleList
   */
  clear(): boolean;

  /**
   * @description get the id-th people from the list
   *
   * @param {number} id - the id of people to be get
   * @return {*}  {People}
   * @memberof IPeopleList
   */
  getPeople(id: number): People;

  /**
   * @description change the id-th people into a new people
   *
   * @param {number} id - id of the people to be changed
   * @param {People} newPeople - new people to be assigned as the id-th people in the list
   * @return {*}  {boolean}
   * @memberof IPeopleList
   */
  changePeople(id: number, newPeople: People): boolean;

  /**
   * @description find the first index of a people. If not in the list, return -1
   *
   * @param {People} people
   * @return {*}  {number} - find the first index of a people. If not in the list, return -1
   * @memberof IPeopleRepository
   */
  findIndex(people: People): number;
}
