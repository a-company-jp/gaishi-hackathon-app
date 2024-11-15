package service

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/redis/go-redis/v9"

	"github.com/a-company-jp/gaishi-hackathon-app/backend/graph/model"
)

const (
	RedisRestaurantKey                        = "res:%s"
	RedisMenusByRestKey                       = "menusR:%s"
	TableSessionUserByCookieRestaurantHostKey = "tsubcrh:%s:%s"
	RedisCartChannel                          = "cartUpdated:%d"
	RedisOrderChannel                         = "orderUpdated:%d"
	RestaurantExpire                          = 60 * 60 * 1 // 1 hour
	MenuExpire                                = 60 * 10     // 10 minutes
	TableSessionUserExpire                    = 60 * 60 * 1 // 1 hour
)

type RedisService struct {
	client *redis.Client
}

func NewRedisService(client *redis.Client) *RedisService {
	if client == nil {
		return nil
	}
	return &RedisService{
		client: client,
	}
}

// --- キャッシュ関連メソッド（既に一部実装済み） ---

func (s *RedisService) GetRestaurant(ctx context.Context, id string) (*model.Restaurant, error) {
	var rest model.Restaurant
	result, err := s.client.Get(ctx, fmt.Sprintf(RedisRestaurantKey, id)).Result()
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal([]byte(result), &rest)
	if err != nil {
		return nil, err
	}
	return &rest, nil
}

func (s *RedisService) SetRestaurant(ctx context.Context, id string, rest *model.Restaurant) error {
	restJson, err := json.Marshal(rest)
	if err != nil {
		return err
	}
	err = s.client.Set(ctx, fmt.Sprintf(RedisRestaurantKey, id), restJson, RestaurantExpire).Err()
	if err != nil {
		return err
	}
	return nil
}

func (s *RedisService) GetMenuItemsByRestaurantID(ctx context.Context, id string) ([]*model.MenuItem, error) {
	var menuItems []*model.MenuItem
	result, err := s.client.Get(ctx, fmt.Sprintf(RedisMenusByRestKey, id)).Result()
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal([]byte(result), &menuItems)
	if err != nil {
		return nil, err
	}
	return menuItems, nil
}

func (s *RedisService) SetMenuItemsByRestaurantID(ctx context.Context, id string, menuItems []*model.MenuItem) error {
	menuJson, err := json.Marshal(menuItems)
	if err != nil {
		return err
	}
	err = s.client.Set(ctx, fmt.Sprintf(RedisMenusByRestKey, id), menuJson, MenuExpire).Err()
	if err != nil {
		return err
	}
	return nil
}

func (s *RedisService) GetTableSessionUserByCookieRestaurantHost(ctx context.Context, cookie string, restaurantHost string) (*model.TableSessionUser, error) {
	var tsu model.TableSessionUser
	result, err := s.client.Get(ctx, fmt.Sprintf(TableSessionUserByCookieRestaurantHostKey, cookie, restaurantHost)).Result()
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal([]byte(result), &tsu)
	if err != nil {
		return nil, err
	}
	return &tsu, nil
}

func (s *RedisService) SetTableSessionUserByCookieRestaurantHost(ctx context.Context, cookie string, restaurantHost string, tsu *model.TableSessionUser) error {
	tsuJson, err := json.Marshal(tsu)
	if err != nil {
		return err
	}
	err = s.client.Set(ctx, fmt.Sprintf(TableSessionUserByCookieRestaurantHostKey, cookie, restaurantHost), tsuJson, TableSessionUserExpire).Err()
	if err != nil {
		return err
	}
	return nil
}

// --- Pub/Sub関連メソッド ---

// PublishCartUpdate publishes a cart update to subscribers
func (s *RedisService) PublishCartUpdate(ctx context.Context, tableSessionID int, cart *model.Cart) error {
	channel := fmt.Sprintf(RedisCartChannel, tableSessionID)
	cartJson, err := json.Marshal(cart)
	if err != nil {
		return err
	}
	return s.client.Publish(ctx, channel, cartJson).Err()
}

// SubscribeCartUpdates subscribes to cart updates for a table session
func (s *RedisService) SubscribeCartUpdates(ctx context.Context, tableSessionID int) *redis.PubSub {
	channel := fmt.Sprintf(RedisCartChannel, tableSessionID)
	return s.client.Subscribe(ctx, channel)
}

// PublishOrderUpdate publishes an order update to subscribers
func (s *RedisService) PublishOrderUpdate(ctx context.Context, orderID int, order *model.PlacedOrder) error {
	channel := fmt.Sprintf(RedisOrderChannel, orderID)
	orderJson, err := json.Marshal(order)
	if err != nil {
		return err
	}
	return s.client.Publish(ctx, channel, orderJson).Err()
}

// SubscribeOrderUpdates subscribes to order updates for an order
func (s *RedisService) SubscribeOrderUpdates(ctx context.Context, orderID int) *redis.PubSub {
	channel := fmt.Sprintf(RedisOrderChannel, orderID)
	return s.client.Subscribe(ctx, channel)
}

// --- その他のメソッド ---

// RemoveTableSessionUser removes the session user from the cache
func (s *RedisService) RemoveTableSessionUserByCookieRestaurantHost(ctx context.Context, cookie string, restaurantHost string) error {
	return s.client.Del(ctx, fmt.Sprintf(TableSessionUserByCookieRestaurantHostKey, cookie, restaurantHost)).Err()
}
