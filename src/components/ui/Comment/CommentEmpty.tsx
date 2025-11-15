import EmptyContent from '@/components/ui/EmptyContent';

export default function CommentEmpty() {
  return (
    <EmptyContent className='[&_img]:w-[200px]'>
      <p className='text-text-default text-md font-medium lg:text-base'>
        아직 작성된 댓글이 없습니다.
      </p>
    </EmptyContent>
  );
}
