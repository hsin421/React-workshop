import alt from 'altInstance';

class AltActions {
  /*
   * @param String topic id to increment with
   */
  increment(id) {
    this.dispatch(id);

    //Also post to any server backend to update recrods in database;
  }

  /*
   * @param String topic id to decrement with
   */
  decrement(id) {
    this.dispatch(id);

    //Also post to any server backend to update recrods in database;
  }

}

export default alt.createActions(AltActions);