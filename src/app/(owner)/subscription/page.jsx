'use client'

export default function Subcsription(props) {
  return (
    <div className="container">
      <p>Subcsription</p>
      <p>{sessionStorage.getItem('ok')}</p>
      <button
        onClick={() => {
          sessionStorage.setItem('ok', '12')
        }}
      >
        add
      </button>
      <br />
      <button
        onClick={() => {
          sessionStorage.removeItem('ok')
        }}
      >
        Remove
      </button>
    </div>
  )
}
