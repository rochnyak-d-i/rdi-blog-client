import React, { Suspense, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";

import { Header } from './Header';
import { Footer } from './Footer';

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
  )
);
const EditPostPage = React.lazy(
  () => import(
    /* webpackChunkName: "edit-post-page" */
    '../pages/EditPostPage/EditPostPage'
  )
);
const SearchPage = React.lazy(
  () => import(
    /* webpackChunkName: "search-page" */
    '../pages/SearchPage/SearchPage'
  )
);

export interface AppProps {}

export function App(props: AppProps) {
  return (
    <Fragment>
      <Header />

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              path="/"
              exact
              component={HomePage}
            />

            <Route
              path="/search"
              exact
              component={SearchPage}
            />

            <Route
              path="/post/create"
              exact
              component={CreatePostPage}
            />

            <Route
              path="/post/:id"
              exact
              component={PostPage}
            />

            <Route
              path="/post/:id/edit"
              exact
              component={EditPostPage}
            />
          </Switch>
        </Suspense>
      </main>

      <Footer />
    </Fragment>
  );
}
