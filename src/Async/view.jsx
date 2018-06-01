import React from 'react'
import Loader from '../Loader'
import Error from '../Error'

const AsyncEntry = ({ item }) =>
  <tr>
    <td>{item.userId}</td>
    <td>{item.id}</td>
    <td>{item.title}</td>
    <td>{item.completed ? 'Yes' : 'No'}</td>
  </tr>

export default props =>
  <div className='app'>
    <Loader />
    <Error />
    <div className='title'>
        Async Demo
    </div>
    <div className='table-container'>
      <table>
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Todo Id</th>
            <th>Text</th>
            <th>Completed</th>
          </tr>
          {props.dataAsyncModule.map((e, index) =>
            <AsyncEntry key={index} item={e} />
          )}
        </tbody>
      </table>
    </div>
    <button disabled={props.activeAsyncModule} className='ajax-button-container' onClick={props.onGetAsyncModule}>
        Ajax Load
    </button>
    <button disabled={props.activeAsyncModule} className='ajax-button-container' onClick={props.clear}>
        Clear
    </button>
  </div>
