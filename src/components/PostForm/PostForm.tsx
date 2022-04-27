import Button from 'components/Button';
import Textarea from 'components/Textarea';
import { Formik } from 'formik';
import { LoadingSpokes } from 'icons';
import styles from './PostForm.module.scss';

export type PostFormProps = {
  title: string;
  onSubmit: (values: { title: string; content: string }) => Promise<void>;
};

function PostForm({ title, onSubmit }: PostFormProps) {
  return (
    <div className={styles.PostFormContainer}>
      <h1>{title}</h1>
      <Formik
        initialValues={{ title: '', content: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Textarea
                value={values.title}
                onChange={handleChange}
                placeholder="제목"
                name="title"
                resizable={false}
              />
              <Textarea
                value={values.content}
                onChange={handleChange}
                placeholder="내용"
                name="content"
                minRows={7}
              />
              <Button
                type="submit"
                disabled={!values.title || !values.content || isSubmitting}
                data-testid="submitButton"
              >
                {isSubmitting ? <LoadingSpokes /> : '제출'}
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PostForm;