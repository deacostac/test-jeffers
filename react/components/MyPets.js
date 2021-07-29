import {useState, useRef} from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useMutation, useQuery } from 'react-apollo'
import MYPETS from '../graphql/mutation/mutation.createDocuments.graphql'
import TYPEPETS from '../graphql/query/getTypePets.graphql'
import { DatePicker } from 'vtex.styleguide'
import { Button } from 'vtex.styleguide'
import GET_PROFILE from '../graphql/query/getProfile.graphql'
import ShowMyPets from './ShowMyPets'


//Css Handles declaration
const CSS_HANDLES = [
  'Container', 'petName', 'petNameContainer', 'petTypeContainer',
  'petType', 'petDateContainer', 'petDate', 'petDatePicker', 'containerButton'
]

const MyPets = () => {

  //Import the Css Handles
const handles = useCssHandles(CSS_HANDLES)

//declarating states
const petName = useRef(null)
const petType = useRef(null)
const [date, setDate] = React.useState(new Date('2020-08-18'));


//Graphql Queries 
const [createDocument] = useMutation(MYPETS)
const {loading, data } = useQuery(TYPEPETS)
const {loading: loadingProfile, data: profile} = useQuery(GET_PROFILE)


const createMyPets = async () => {
  const resMyPets = await createDocument({
    variables: {
        "acronym": "PT",
        "document": {
          "fields": [{
            "key": "name",
            "value": petName.current.value
          },
          {
            "key": "type",
            "value": petType.current.value.replace(',', '')
          },
          {
            "key": "date",
            "value": date
          },
          {
            "key": "email",
            "value": profile?.profile?.email
          }]
          
        }
    }
  })

}

const handlePets = () => {
  console.log(petName.current.value)
  console.log(petType.current.value.replace(',', ''))
  console.log(date)
  createMyPets()
}


if (loading || !data) return (
  
  <div className={handles.Container} onClick={createMyPets}>
      <ShowMyPets/>
      <div className={handles.petNameContainer}>
      <h1>Add New Pet</h1>
        <label>Name</label>
        <input placeholder="pet name"></input>
      </div>
      <div className={handles.petTypeContainer}>
        <label>Pet Type</label>
        <select>
          <option>Loading</option>
        </select>
        
      </div>
      <div className={handles.petDateContainer}>
        <label>Date</label>
        {/*data picker*/}
  
      <div className={handles.DatePicker}>
        <DatePicker
        size="small"
        value={date}
        onChange={date => setDate(date)}
        locale="en-US"
        />
      </div>

        {/*data picker*/}
      </div>
    </div>
    ); else { 
      
    return (
    <div className={handles.Container} onClick={createMyPets}>
      <ShowMyPets/>
      
      <div className={handles.petNameContainer}>
      <h1>Add New Pet</h1>
        <label>Name</label>
        <input placeholder="pet name" ref={petName}></input>
      </div>
      <div className={handles.petTypeContainer}>
        <label>Pet Type</label>
        <select ref={petType}>
          {data.documents.map((document) => (
            <option key={document.id} 
                    value={document.fields.map((field) => { if (field.key === "typePets") return field.value })}>
              {document.fields.map((field) => { if (field.key === "typePets") return field.value})}
            </option>
          ))}
        </select>
        
      </div>
      <div className={handles.petDateContainer} >
        <label onClick={console.log(profile?.profile?.email)}>Date</label>
        {/*data picker*/}
  
      <div className={handles.DatePicker}>
        <DatePicker
        size="small"
        value={date}
        onChange={date => setDate(date)}
        locale="en-US"
        />
      </div>

        {/*data picker*/}
      </div>
      <div className={handles.containerButton}>
      <Button variation="primary" onClick={handlePets}>
        SAVE
      </Button>
      </div>
    </div>
   
  )}
}

export default MyPets
