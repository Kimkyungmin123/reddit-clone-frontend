import Button from 'components/Button';
import DeleteModal from 'components/DeleteModal';
import useModal from 'hooks/useModal';
import useUser from 'hooks/useUser';
import profile from 'images/profileImg.png';
import Image from 'next/image';
import { useRef } from 'react';
import { mutate } from 'swr';
import { MyImage } from 'types';
import editProfile from 'utils/editProfile';
import styles from './ImageBox.module.scss';

export type ImageBoxProps = {
  image: MyImage;
  introduction: string;
};

// TODO: 현재 로그인한 사용자의 프로필일 때만 업로드, 삭제 버튼 출력
function ImageBox({ image, introduction }: ImageBoxProps) {
  const { imgUrl } = image;
  const inputRef = useRef<HTMLInputElement>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const { user } = useUser();

  return (
    <div className={styles.imageBox} data-testid="image-box">
      <div className={styles.profileImage}>
        <Image
          src={imgUrl || profile}
          alt="프로필 이미지"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.buttons}>
        <input
          type="file"
          ref={inputRef}
          hidden
          onChange={async (event) => {
            if (event.target.files) {
              const { data } = await editProfile({
                introduction,
                imageFile: event.target.files[0],
              });
              const { image } = data;
              await mutate(
                '/profile/show',
                { user: { ...user, image } },
                false
              );
            }
          }}
        />
        <Button
          ariaLabel="프로필 이미지 업로드"
          onClick={() => inputRef.current?.click()}
        >
          이미지 업로드
        </Button>
        {imgUrl && (
          <Button
            variant="plain"
            ariaLabel="프로필 이미지 제거"
            onClick={openModal}
          >
            제거
          </Button>
        )}
        {isModalOpen && (
          <DeleteModal
            title="이미지 삭제"
            message={'정말 이미지를 삭제하시겠습니까?'}
            onConfirm={async () => {
              const { data } = await editProfile({ introduction });
              const { image } = data;
              closeModal();
              await mutate(
                '/profile/show',
                { user: { ...user, image } },
                false
              );
            }}
            onCancel={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default ImageBox;