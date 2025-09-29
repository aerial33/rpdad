import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { cn } from '@/utilities/ui'

export type Props = {
  posts: CardPostData[]
  relationTo?: 'posts' | 'emplois'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, relationTo = 'posts' } = props
  return (
    <div className={cn('container mt-12 flex flex-col lg:flex-row xl:ps-0')}>
      <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-20">
        <div className="blog classic-view">
          <article className="post !mb-8 border border-red-500">
            {posts && posts.length > 0 && (
              <Card
                doc={posts[0]}
                relationTo={relationTo}
                showCategories
                variant="featured"
                className="shadow-card"
              />
            )}
          </article>
        </div>

        <div className="blog itemgrid grid-view">
          <div className="isotope mx-[-15px] !mt-[-40px] !mb-8 flex flex-wrap md:mx-[-20px] lg:mx-[-20px] xl:mx-[-20px]">
            {posts?.slice(1).map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <article
                    key={index + 1}
                    className="item post !mt-[40px] w-full max-w-full flex-[0_0_auto] !px-[15px] md:w-6/12 md:!px-[20px] lg:w-6/12 lg:!px-[20px] xl:w-6/12 xl:!px-[20px]"
                  >
                    <Card doc={result} relationTo={relationTo} showCategories variant="grid" />
                  </article>
                )
              }
              return null
            })}
          </div>
        </div>
      </div>

      <aside className="mt-12 w-full self-start lg:sticky lg:top-7 lg:mt-0 lg:w-2/5 lg:ps-10 xl:w-1/3 xl:ps-0">
        <div className="widget-about rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
          {/* Search */}
          <div className="widget-search">
            <form className="rounded-3xl bg-white/80 text-gray-600 backdrop-blur-sm">
              <div className="form-floating relative !mb-0">
                <input
                  id="search-form"
                  type="text"
                  className="focus:ring-primary-light focus:border-primary block w-full rounded-full border-neutral-200 bg-white py-2 focus:ring-2 focus:outline-none sm:ps-4 sm:text-sm"
                  placeholder="Recherche"
                />
                <label
                  htmlFor="search-form"
                  className="pointer-events-none absolute top-0 left-0 z-[2] inline-block h-full origin-[0_0] overflow-hidden border border-solid border-transparent px-4 py-[0.6rem] text-[.75rem] text-ellipsis whitespace-nowrap !text-[#959ca9]"
                ></label>
              </div>
            </form>
          </div>
          {/* À propos */}
          <div className="widget !mt-[40px]">
            <h4 className="!mb-3 text-2xl font-bold text-gray-700">{'À propos de nous'}</h4>
            <p>
              Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum.
              Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget
              metus.
            </p>
          </div>
        </div>
        {/* Article Populaire */}
        <div className="widget mt-4 rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
          <h4 className="!mb-3 text-2xl font-bold text-gray-700">{'Articles populaires'}</h4>
          <ul className="m-0 p-0 after:invisible after:clear-both after:block after:h-0 after:content-['']">
            <li className="clear-both block overflow-hidden">
              <figure className="float-left !h-[4.5rem] w-14 !rounded-[.4rem]">
                <a href="./blog-post.html">
                  <img className="!rounded-[.4rem]" src="./assets/img/photos/a1.jpg" alt="image" />
                </a>
              </figure>
              <div className="!relative !mb-0 !ml-[4.25rem]">
                <h6 className="!mb-2">
                  <a className="!text-[#343f52] hover:!text-[#3f78e0]" href="./blog-post.html">
                    Magna Mollis Ultricies
                  </a>
                </h6>
                <ul className="m-0 list-none p-0 !text-[0.7rem] !text-[#aab0bc]">
                  <li className="post-date inline-block">
                    <i className="uil uil-calendar-alt pr-[0.2rem] align-[-.05rem] before:content-['\e9ba']"></i>
                    <span>26 Mar 2022</span>
                  </li>
                  <li className="post-comments inline-block before:m-[0_.6rem_0] before:inline-block before:h-[0.2rem] before:w-[0.2rem] before:rounded-[100%] before:bg-[#aab0bc] before:align-[.15rem] before:opacity-50 before:content-['']">
                    <a
                      className="!text-[#aab0bc] hover:!border-[#3f78e0] hover:!text-[#3f78e0]"
                      href="#"
                    >
                      <i className="uil uil-comment pr-[0.2rem] align-[-.05rem] before:content-['\ea54']"></i>
                      3
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="clear-both !mt-4 block overflow-hidden">
              <figure className="float-left !h-[4.5rem] w-14 !rounded-[.4rem]">
                <a href="./blog-post.html">
                  <img className="!rounded-[.4rem]" src="./assets/img/photos/a2.jpg" alt="image" />
                </a>
              </figure>
              <div className="!relative !mb-0 !ml-[4.25rem]">
                <h6 className="!mb-2">
                  <a className="!text-[#343f52] hover:!text-[#3f78e0]" href="./blog-post.html">
                    Ornare Nullam Risus
                  </a>
                </h6>
                <ul className="m-0 list-none p-0 !text-[0.7rem] !text-[#aab0bc]">
                  <li className="post-date inline-block">
                    <i className="uil uil-calendar-alt pr-[0.2rem] align-[-.05rem] before:content-['\e9ba']"></i>
                    <span>16 Feb 2022</span>
                  </li>
                  <li className="post-comments inline-block before:m-[0_.6rem_0] before:inline-block before:h-[0.2rem] before:w-[0.2rem] before:rounded-[100%] before:bg-[#aab0bc] before:align-[.15rem] before:opacity-50 before:content-['']">
                    <a
                      className="!text-[#aab0bc] hover:!border-[#3f78e0] hover:!text-[#3f78e0]"
                      href="#"
                    >
                      <i className="uil uil-comment pr-[0.2rem] align-[-.05rem] before:content-['\ea54']"></i>
                      6
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="clear-both !mt-4 block overflow-hidden">
              <figure className="float-left !h-[4.5rem] w-14 !rounded-[.4rem]">
                <a href="./blog-post.html">
                  <img className="!rounded-[.4rem]" src="./assets/img/photos/a3.jpg" alt="image" />
                </a>
              </figure>
              <div className="!relative !mb-0 !ml-[4.25rem]">
                <h6 className="!mb-2">
                  <a className="!text-[#343f52] hover:!text-[#3f78e0]" href="./blog-post.html">
                    Euismod Nullam Fusce
                  </a>
                </h6>
                <ul className="m-0 list-none p-0 !text-[0.7rem] !text-[#aab0bc]">
                  <li className="post-date inline-block">
                    <i className="uil uil-calendar-alt pr-[0.2rem] align-[-.05rem] before:content-['\e9ba']"></i>
                    <span>8 Jan 2022</span>
                  </li>
                  <li className="post-comments inline-block before:m-[0_.6rem_0] before:inline-block before:h-[0.2rem] before:w-[0.2rem] before:rounded-[100%] before:bg-[#aab0bc] before:align-[.15rem] before:opacity-50 before:content-['']">
                    <a
                      className="!text-[#aab0bc] hover:!border-[#3f78e0] hover:!text-[#3f78e0]"
                      href="#"
                    >
                      <i className="uil uil-comment pr-[0.2rem] align-[-.05rem] before:content-['\ea54']"></i>
                      5
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        {/* Categories */}
        <div className="widget mt-4 rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
          <h4 className="!mb-3 text-2xl font-bold text-gray-700">Categories</h4>
          <ul className="bullet-primary list-none pl-0 !text-inherit">
            <li className="before:font-SansSerif relative !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Teamwork (21)
              </a>
            </li>
            <li className="before:font-SansSerif relative !mt-[.35rem] !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Ideas (19)
              </a>
            </li>
            <li className="before:font-SansSerif relative !mt-[.35rem] !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Workspace (16)
              </a>
            </li>
            <li className="before:font-SansSerif relative !mt-[.35rem] !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Coding (7)
              </a>
            </li>
            <li className="before:font-SansSerif relative !mt-[.35rem] !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Meeting (12)
              </a>
            </li>
            <li className="before:font-SansSerif relative !mt-[.35rem] !pl-[1rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['\\2022']">
              <a className="!text-[#60697b] hover:!text-[#3f78e0]" href="#">
                Business Tips (14)
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
