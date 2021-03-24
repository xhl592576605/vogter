import "core-js/modules/es.string.small";
import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'clsx';
import TableOfContents from 'rsg-components/TableOfContents'
import filterSectionsByName from 'rsg-components/../utils/filterSectionsByName'

var styles = function styles({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) {
  var _hasSidebar, _content, _sidebar;
  sidebarWidth = 300
  return {
    root: {
      height: '100vh',
      backgroundColor: color.baseBackground,
      display: 'flex',
      'flex-direction': 'column'
    },
    contain: {
      position: 'relative',
      height: '100%'
    },
    container: {
      flex: 1,
      backgroundColor: color.baseBackground,
    },
    hasSidebar: (_hasSidebar = {
      paddingLeft: sidebarWidth
    }, _hasSidebar[mq.small] = {
      paddingLeft: 0
    }, _hasSidebar),
    content: (_content = {
      height: '100%',
      overflow: 'auto',
      maxWidth: 1000,
      padding: [[space[2], space[2]]],
      margin: [[0, 'auto']],
      '&::-webkit-scrollbar': { // 隐藏滚动条
        display: 'none'
      },
    }, _content[mq.small] = {
      padding: space[2]
    }, _content.display = 'block', _content),
    sidebar: (_sidebar = {
      border: [[color.border, 'solid']],
      borderWidth: [[0, 1, 0, 0]],
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: sidebarWidth,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      '& nav': {
        marginBottom: 60
      }
    }, _sidebar[mq.small] = {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0]
    }, _sidebar),
    footer: {
      display: 'block',
      color: color.light,
      fontFamily: fontFamily.base,
      fontSize: fontSize.small
    }
  };
};

// 重写分组过滤逻辑，保持结构
TableOfContents.prototype.renderSections = function renderSections () {
  var searchTerm = this.state.searchTerm;
  var _this$props = this.props,
      sections = _this$props.sections,
      useRouterLinks = _this$props.useRouterLinks; // If there is only one section, we treat it as a root section
  // In this case the name of the section won't be rendered and it won't get left padding
  // Since a section can contain only other sections,
  // we need to make sure not to loose the subsections.
  // We will treat those subsections as the new roots.

  // var firstLevel = sections.length === 1 ? // only use subsections if there actually are subsections
  // sections[0].sections && sections[0].sections.length ? sections[0].sections : sections[0].components : sections;
  var firstLevel = sections.length === 1 && sections[0].components.length && !sections[0].name ? sections[0].components : sections
  var filtered = firstLevel ? filterSectionsByName(firstLevel, searchTerm) : firstLevel;
  return filtered ? this.renderLevel(filtered, useRouterLinks).content : null;
}

// 获取路由重定向
function getRedirect(sections, path = '#/') {
  for (let section of sections) {
    // react-styleguidist默认忽略单节点且空内容的结构，需要忽略一级重定向
    // https://github.com/styleguidist/react-styleguidist/blob/9b6b6f60051f170dcb7f548fb114420a48a8e1e9/src/client/rsg-components/TableOfContents/TableOfContents.tsx#L79
    // *** 已通过上文代码改写实现结构保持，重定向无需特殊处理 TableOfContents.prototype.renderSections
    // if (!(depth === 0 && sections.length === 1 && section.sections && section.sections.length)) {
    //   path += section.name + '/'
    // }
    if (section.name) {
      path += section.name + '/'
    }
    if (section.components && section.components.length) {
      return path + section.components[0].name
    } else {
      return getRedirect(section.sections, path)
    }
  }
}

export var StyleGuideRenderer = function StyleGuideRenderer(_refs) {
  var { classes, homepageUrl, children, toc, hasSidebar } = _refs
  if (!window.location.hash) {
    let hash = getRedirect(toc.props.sections, undefined)
    if (hash) {
      window.location = location.href + hash
    }
  }

  return (
    <div className={classes.root}>
      <div className={cx(classes.container)}>
        <div className={cx(classes.contain, hasSidebar && classes.hasSidebar)}>
          {hasSidebar && (
            <div className={classes.sidebar} data-testid="sidebar">
              {toc}
            </div>
          )}
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
};
StyleGuideRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool
};
export default Styled(styles)(StyleGuideRenderer);
