import {useState, useRef} from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import QUERY_MYPETS from '../graphql/query/getMyPets.graphql'

const ShowMyPets = () => {

const {loading, data } = useQuery(QUERY_MYPETS)
if (loading || !data) return (

    <div>
        <h1>No Data</h1> 
    </div>
      ); else { 
        
      return (
      <div>
        <h1>My Pets</h1>
       <div>
            {data.documents.map((document) => (
              <div key={document.id}>
                  <label>Email: </label>
                  <label>{document.fields.map((field) => { if (field.key === "email" && field.value ) return field.value})}</label>
                  <br/>
                  <label>Name: </label>
                  <label>{document.fields.map((field) => { if (field.key === "name") return field.value})}</label>
                  <br/>
                  <label>Type: </label>
                  <label>{document.fields.map((field) => { if (field.key === "type") return field.value})}</label>
                  <br/>
                  <label>Birthday: </label>
                  <label>{document.fields.map((field) => { if (field.key === "date") return field.value})}</label>
                  <br/><br/>
              </div>
              ))}
              
            </div>
        </div>
    )}

}

export default ShowMyPets