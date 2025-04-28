import { useState } from 'react'

const BlogFilter = ({ postQuery, latest, setSearchParams }) => {
  const [search, setSearch] = useState(postQuery)
  const [checked, setChecked] = useState(latest)

  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target
    const query = form.search.value
    //find the checkbox and its state
    const isLatest = form.latest.checked

    console.log(form, 'form')
    console.log(isLatest, 'isLatest')

    const params = {}
    if (query.length) params.post = query
    //if the checkbox is true, then add this value to the parameters
    if (isLatest) params.latest = true

    //changes search string
    setSearchParams(params)
  }

  return (
    <form onSubmit={handleSubmit}>

      <input type='search' name="search" value={search} onChange={e => setSearch(e.target.value)} />
      <button type="submit">Search</button>
      <label>
        <input type='checkbox' name="latest" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        New only
      </label>

    </form>
  )
}

export { BlogFilter }