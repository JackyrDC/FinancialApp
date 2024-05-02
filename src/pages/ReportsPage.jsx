import PocketBaseContext from './PocketBaseContext' 
import { useContext } from 'react'


export const ReportsPage = async() => {
  const pb = useContext(PocketBaseContext)
  const user = pb.authStore.model.id
  const userExpenses = await pb.collection("expenses").getFullList(1,50,{filter:'user = '+ user })
  console.log(userExpenses)
  
  return (
    <h1>

    </h1>
  )
}
