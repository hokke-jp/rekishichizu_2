import { Sort } from 'Parts/Sort'
import { SortBy } from 'Utils/Types'

const SORT_ARRAY: [SortBy, string, string][] = [
  ['created_at DESC', '最新', ' border-r border-b'],
  ['likes_count DESC', '人気', ' border-b'],
  ['period_id DESC', '古い', ' border-r'],
  ['period_id ASC', '新しい', '']
]

export const Sorts = () => {
  return (
    <div className="grid grid-rows-2 grid-cols-2 min-h-[96px] border border-[#B7B7B7] rounded-2xl overflow-hidden">
      {SORT_ARRAY.map((sortState) => (
        <Sort sortState={sortState} key={sortState[1]} />
      ))}
    </div>
  )
}
