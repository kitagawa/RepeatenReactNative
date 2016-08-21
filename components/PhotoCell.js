'use strict';
import React, {Component} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';
import ApplicationStyle from './../assets/applicationStyle.json'
import CustomTouchableElement from './CustomTouchableElement';
export default class PhotoCell extends Component{
  formatDate(dateString){
    var year = dateString.substring(0,4);
    var month = dateString.substring(5,7);
    var day = dateString.substring(8,10);
    return year + "/" + month + "/" + day
  }

  render() {
    var photo =  this.props.photo
    var user = photo.user
    return (
      <View style={styles.row}>
        <CustomTouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.card}>
            <View style={styles.userContainer}>
              <Image style={styles.userIcon}
                source={{uri:user.user_icon_url}}/>
              <View style={styles.usernameContainer}>
                <Text style={styles.username}>
                  {user.username}
                </Text>
                <Text style={styles.created_at}>
                  {this.formatDate(photo.created_at)}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{uri:photo.url}}
                style={styles.cellImage}/>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.favoritesCount}>
                食べたい！{photo.favorites_count}件
              </Text>
              <View style={styles.categoryContainer}>
                {
                  photo.venue ?
                  <View style={styles.iconText}>
                    <Image source={require("./../assets/images/ic_place_black_18dp.png")}/>
                    <Text style={styles.category}>
                      {photo.venue.name}
                    </Text>
                  </View>
                  : null
                }
                {
                  photo.category ?
                  <View style={styles.iconText}>
                    <Image source={require("./../assets/images/ic_restaurant_black_18dp.png")}/>
                    <Text style={styles.category}>
                      {photo.category.name}
                    </Text>
                  </View>
                  : null
                }
              </View>
              <Text style={styles.photoComment}>
                {photo.title}
              </Text>
              {photo.comments.length > 0 ?
                <View style={photo.comments.length > 2 ? styles.horizontalWaveLine : styles.horizontalLine}/>
                : null
              }
              <View style={styles.commentsContainer}>
                {photo.comments.slice(photo.comments.length-2, photo.comments.length).map((comment)=>{
                  return <View key={comment.comment_id} style={styles.commentContainer}>
                    <View style={styles.userContainer}>
                      <Image style={styles.userIcon}
                        source={{uri:comment.user.user_icon_url}}/>
                      <View style={styles.usernameContainer}>
                        <Text style={styles.username}>
                          {comment.user.username}
                        </Text>
                        <Text style={styles.created_at}>
                          {this.formatDate(comment.posted_at)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.photoComment}>
                      {comment.body}
                    </Text>
                  </View>
                })}
              </View>
              <View style={styles.horizontalLine}/>
              <Text style={styles.commentsCount}>
                コメント{photo.comments_count}件
              </Text>
            </View>
          </View>
        </CustomTouchableElement>
      </View>
    );
  }
}

var { width, height, scale } = Dimensions.get('window');
var styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: ApplicationStyle.backgroundColor,
    borderWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
  titleContainer: {
    padding: 10
  },
  favoritesCount: {
    color: ApplicationStyle.textMutedColor,
    fontWeight: "bold",
    paddingBottom: 20
  },
  categoryContainer:{
    flexDirection: "row",
    paddingBottom: 10
  },
  category:{
    color: ApplicationStyle.linkColor,
    paddingRight: 10
  },
  iconText:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  photoComment: {
    color: ApplicationStyle.textColor,
    fontSize: ApplicationStyle.fontSize
  },
  userContainer: {
    padding: 5,
    flexDirection: 'row',
  },
  userIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 3,
    marginRight: 10
  },
  usernameContainer: {
    flexDirection: 'column'
  },
  username:{
    color: ApplicationStyle.themeColor,
    fontSize: ApplicationStyle.fontSizeLarge
  },
  created_at: {
    color: ApplicationStyle.textMutedColor,
    fontSize: ApplicationStyle.fontSizeSmall
  },
  photoSubtitle: {
    color: ApplicationStyle.textColor,
    fontSize: ApplicationStyle.fontSizeSmall,
  },
  imageContainer:{
    flexDirection: 'row',
    marginLeft: -5,
    marginRight: -5,
    borderTopWidth: 1,
    borderColor: ApplicationStyle.borderColor,
  },
  cellImage: {
    flex: 1,
    height: width,
  },
  card:{
    backgroundColor: ApplicationStyle.cardBackgroundColor,
  },
  horizontalLine:{
    borderTopWidth: 1,
    borderColor: ApplicationStyle.borderColor,
    marginTop: 10,
    marginBottom: 10
  },
  horizontalWaveLine:{
    borderTopWidth: 1,
    borderColor: ApplicationStyle.borderColor,
    borderStyle: "solid",
    marginTop: 10,
    marginBottom: 10
  },
  commentContainer: {
    marginBottom: 10
  },
  commentsCount:{
    color: ApplicationStyle.textMutedColor,
    fontSize: ApplicationStyle.fontSize,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 5
  }
});
