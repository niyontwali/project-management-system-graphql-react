import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_CLIENTS } from '../queries/clientQueries'
import { GET_PROJECTS } from '../queries/projectQueries';


const AddProjectModal = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [clientId, setClientId] = useState('')
  const [status, setStatus] = useState('new')

  const { loading, error, data } = useQuery(GET_CLIENTS, {

  })
  
  const [ addProject ] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] } // same as projects.concat([addProject])
      });
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || description === '' || status === '' || clientId === '') {
      return alert('Please fill in all fields')
    }
    addProject(name, description, clientId, status);
    setName('')
    setDescription('')
    setClientId('')
    setStatus('new')
  }

  if (loading) return null
  if (error) return <p>Something went wrong</p>

  return (
    <>
      { !loading && !error && (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
          <div className="d-flex align-items-center">
            <FaList className='icon' />
            <div>New Project</div>
          </div>
        </button>
        <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className="form-label">Name</label>
                    <input type="text" className='form-control' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label className="form-label">Description</label>
                    <textarea className='form-control' id="email" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <label className="form-label">Status</label>
                    <select id="status" className='form-select' value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className='mb-3'>
                    <label className="form-label">Client</label>
                    <select id="clientId" className='form-select' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                      <option value="Select Client">Select Client</option>
                      { data.clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Client</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  )
}

export default AddProjectModal