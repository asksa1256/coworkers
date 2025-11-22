import GradientCheckIcon from '@/assets/icons/GradientCheckIcon.svg?react';
import GradientCommentIcon from '@/assets/icons/GradientCommentIcon.svg?react';
import GradientFolderIcon from '@/assets/icons/GradientFolderIcon.svg?react';
import GradientLogoIcon from '@/assets/icons/GradientLogoIcon.svg?react';
import CommentLargeImg from '@/assets/images/CommentsLargeImg.png';
import CommentMediumImg from '@/assets/images/CommentsMediumImg.png';
import CommentSmallImg from '@/assets/images/CommentsSmallImg.png';
import KanbanLargeImg from '@/assets/images/KanbanLargeImg.png';
import KanbanMediumImg from '@/assets/images/KanbanMediumImg.png';
import KanbanSmallImg from '@/assets/images/KanbanSmallImg.png';
import LandingHeroLargeImg from '@/assets/images/LandingHeroLargeImg.png';
import LandingHeroMediumImg from '@/assets/images/LandingHeroMediumImg.png';
import LandingHeroSmallImg from '@/assets/images/LandingHeroSmallImg.png';
import TodoListLargeImg from '@/assets/images/TodoListLargeImg.png';
import TodoListMediumImg from '@/assets/images/TodoListMediumImg.png';
import TodoListSmallImg from '@/assets/images/TodoListSmallImg.png';
import SelectGroupModal from '@/components/feature/teamPage/SelectGroupModal';
import Button from '@/components/ui/Button';
import useModal from '@/hooks/useModal';
import { userAtom } from '@/store/authAtom';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const handleStart = () => {
    if (user) {
      openModal({
        children: () => <SelectGroupModal />,
        closeIconButton: true,
      });
    } else {
      navigate('/auth/signin');
    }
  };

  return (
    <div className='-mx-4 md:-mx-[26px] lg:-mx-[30px]'>
      <HeroSection onClick={handleStart} />
      <FeatureSection1 />
      <FeatureSection2 />
      <FeatureSection3 />
      <FinalCTA onClick={handleStart} />
    </div>
  );
}

function HeroSection({ onClick }: { onClick?: () => void }) {
  return (
    <section className='bg-bg-secondary flex h-screen flex-col overflow-hidden lg:flex-row'>
      <div className='pt-[34px] md:pt-[89px] lg:pt-[208px]'>
        <div className='pr-[167px] pl-5 md:pl-9 lg:pl-[76px]'>
          <span className='mb-4 block md:mb-[6px]'>
            <GradientLogoIcon className='size-9 lg:size-12' />
          </span>

          <div className='pl-6'>
            <div className='mb-6 md:mb-8 lg:mb-12'>
              <p className='text-slate-400 lg:text-xl'>
                함께 만들어가는 To do list
              </p>
              <h1 className='text-primary text-[36px] leading-[1] font-bold lg:text-5xl'>
                Coworkers
              </h1>
            </div>

            {/* CTA Button (desktop) */}
            <Button
              size='lg'
              className='hidden w-auto px-9 !text-base lg:block'
              onClick={onClick}
            >
              지금 시작하기
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative h-full w-full lg:max-w-[1330px]'>
        <img
          src={LandingHeroSmallImg}
          alt='Coworkers Dashboard'
          className='w-full object-contain md:hidden'
        />
        <img
          src={LandingHeroMediumImg}
          alt='Coworkers Dashboard'
          className='hidden h-full w-full md:block lg:hidden'
        />
        <img
          src={LandingHeroLargeImg}
          alt='Coworkers Dashboard'
          className='hidden h-full w-full object-cover lg:block'
        />
      </div>

      {/* CTA Button (tablet, mobile) */}
      <div className='absolute right-4 bottom-[52px] text-center md:right-8 lg:hidden'>
        <Button size='lg' className='w-auto px-9 !text-base'>
          지금 시작하기
        </Button>
      </div>
    </section>
  );
}

// Feature Section 1: Kanban Board
function FeatureSection1() {
  return (
    <section className='flex flex-col overflow-hidden bg-slate-50 pt-[43px] pb-11 pl-9 md:pt-[73px] md:pb-[80px] md:pl-[62px] lg:flex-row lg:pt-0 lg:pl-[76px]'>
      <div className='shrink-0 pt-[34px] lg:pt-[208px] lg:pr-[105px]'>
        <div className='mb-[4px]'>
          <GradientFolderIcon className='size-[28px] md:size-10 lg:size-12' />
        </div>

        <div className='md:mb-[18px]'>
          <h2 className='text-primary mb-3 font-bold md:mb-[18px] md:text-2xl lg:text-3xl'>
            칸반보드로 함께
            <br />할 일 목록을 관리해요
          </h2>
          <p className='md:text-md text-xs text-slate-400 lg:text-base'>
            팀원과 함께 실시간으로 할 일을 추가하고
            <br />
            지금 무엇을 해야 하는지 한눈에 볼 수 있어요.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative h-full w-full pt-6 lg:max-w-[1024px] lg:pt-[114px]'>
        <img
          src={KanbanSmallImg}
          alt='Coworkers Dashboard'
          className='w-full object-contain md:hidden'
        />
        <img
          src={KanbanMediumImg}
          alt='Coworkers Dashboard'
          className='hidden h-full w-full md:block lg:hidden'
        />
        <img
          src={KanbanLargeImg}
          alt='Coworkers Dashboard'
          className='hidden h-auto w-full object-cover lg:block'
        />
      </div>
    </section>
  );
}

// Feature Section 2: Checklist
function FeatureSection2() {
  return (
    <section className='bg-primary flex flex-col overflow-hidden pt-[43px] pl-9 md:pt-[73px] md:pl-[62px] lg:flex-row lg:pt-0 lg:pl-[76px]'>
      <div className='shrink-0 pt-[34px] lg:order-2 lg:pt-[208px] lg:pl-12'>
        <div className='mb-[4px]'>
          <GradientCheckIcon className='size-[28px] md:size-10 lg:size-12' />
        </div>

        <div className='md:mb-[18px]'>
          <h2 className='mb-3 font-bold text-white md:mb-[18px] md:text-2xl lg:text-3xl'>
            세부적으로 할 일들을
            <br />
            간편하게 체크해요
          </h2>
          <p className='md:text-md text-xs text-blue-100 lg:text-base'>
            일정에 맞춰 해야 할 세부 항목을 정리하고,
            <br />
            하나씩 빠르게 완료해보세요.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative h-full w-full pt-6 lg:order-1 lg:max-w-[1024px] lg:pt-[114px]'>
        <img
          src={TodoListSmallImg}
          alt='Coworkers Dashboard'
          className='w-full object-contain md:hidden'
        />
        <img
          src={TodoListMediumImg}
          alt='Coworkers Dashboard'
          className='hidden h-full w-full md:block lg:hidden'
        />
        <img
          src={TodoListLargeImg}
          alt='Coworkers Dashboard'
          className='hidden h-auto w-full object-cover lg:block'
        />
      </div>
    </section>
  );
}

// Feature Section 3: Comments
function FeatureSection3() {
  return (
    <section className='flex flex-col overflow-hidden bg-slate-50 pt-[43px] pl-9 md:pt-[73px] md:pl-[62px] lg:flex-row lg:pt-0 lg:pl-[76px]'>
      <div className='shrink-0 pt-[34px] lg:pt-[208px] lg:pr-[105px]'>
        <div className='mb-1'>
          <GradientCommentIcon className='size-[28px] md:size-10 lg:size-12' />
        </div>

        <div className='md:mb-[18px]'>
          <h2 className='text-primary mb-3 font-bold md:mb-[18px] md:text-2xl lg:text-3xl'>
            할 일 공유를 넘어
            <br />
            의견을 나누고 함께 결정해요
          </h2>
          <p className='md:text-md text-xs text-slate-400 lg:text-base'>
            댓글로 진행상황을 기록하고 피드백을 주고받으며
            <br />
            함께 결정을 내릴 수 있어요.
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className='relative h-full w-full pt-6 lg:max-w-[1024px] lg:pt-[114px]'>
        <img
          src={CommentSmallImg}
          alt='Coworkers Dashboard'
          className='w-full object-contain md:hidden'
        />
        <img
          src={CommentMediumImg}
          alt='Coworkers Dashboard'
          className='hidden h-full w-full md:block lg:hidden'
        />
        <img
          src={CommentLargeImg}
          alt='Coworkers Dashboard'
          className='hidden h-auto w-full object-cover lg:block'
        />
      </div>
    </section>
  );
}

// CTA Section
function FinalCTA({ onClick }: { onClick?: () => void }) {
  return (
    <section className='relative bg-white py-[60px] pt-[60px] pb-[125px] md:py-[80px] md:pt-[76px] md:pb-[117px] lg:pt-[97px] lg:pb-[123px]'>
      <div className='mx-auto max-w-[1920px] px-4 text-center'>
        <div className='mb-[28px]'>
          <h2 className='text-2lg text-primary mb-2 font-bold md:text-2xl'>
            지금 바로 시작해보세요
          </h2>
          <p className='text-text-default text-xs md:text-base'>
            팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
          </p>
        </div>

        <div className='text-center'>
          <Button
            size='lg'
            className='w-auto px-9 !text-base'
            onClick={onClick}
          >
            지금 시작하기
          </Button>
        </div>
      </div>
    </section>
  );
}
