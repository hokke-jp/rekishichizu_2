export const Introduction = ({ introduction }: { introduction: string | null }) => {
  return (
    <div className="text-gray-500 sm:text-lg whitespace-pre-wrap break-all">
      {introduction || 'コメントが設定されていません'}
    </div>
  )
}
