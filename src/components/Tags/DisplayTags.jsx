// Component that displays a list of tags
export default function DisplayTags({ tags }) {

  // Build the DOM elements
  return (
    <>
    {tags.map(tag =>
      <div key={tag.id} className="tag">
        {tag.name}
      </div>  
    )}
    </>
  )
}