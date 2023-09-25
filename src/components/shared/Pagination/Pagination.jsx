import { default as PaginationShared } from 'rc-pagination'
import 'rc-pagination/assets/index.css'

export default function Pagination({ currentPage, total, onChange, pageSize = 10 }) {
  return (
    <div className="mt-2">
      <PaginationShared
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
      />
    </div>
  )
}
