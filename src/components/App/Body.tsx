import React, { ReactElement, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { withPostParam } from '@components/pages/common/withPostParam';
import { NotFoundPage } from './Error';

const Loading = () => (<div>Loading...</div>);

function getHOCPageFromModule(module: {default: any}, HOC: Function) {
  return {
    default: HOC(module.default, Loading)
  };
}

const HomePage = React.lazy(
  () => import(
    /* webpackChunkName: "home-page" */
    '../pages/HomePage/HomePage'
  )
);
const CreatePostPage = React.lazy(
  () => import(
    /* webpackChunkName: "create-post-page" */
    '../pages/CreatePostPage/CreatePostPage'
  )
);
const PostPage = React.lazy(
  () => import(
    /* webpackChunkName: "post-page" */
    '../pages/PostPage/PostPage'
  ).then(module => getHOCPageFromModule(module, withPostParam))
);
const EditPostPage = React.lazy(
  () => import(
    /* webpackChunkName: "edit-post-page" */
    '../pages/EditPostPage/EditPostPage'
  ).then(module => getHOCPageFromModule(module, withPostParam))
);
const SearchPage = React.lazy(
  () => import(
    /* webpackChunkName: "search-page" */
    '../pages/SearchPage/SearchPage'
  )
);

export interface IAppBodyProps {}

export function AppBody(props: IAppBodyProps): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/post/create" component={CreatePostPage} />
        <Route exact path="/post/:id" component={PostPage} />
        <Route exact path="/post/:id/edit" component={EditPostPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
}
