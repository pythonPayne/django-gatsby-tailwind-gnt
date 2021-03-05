import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene.utils.str_converters import to_snake_case

from .models import Todo


class TodoNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = Todo
        filter_fields = {
            'user': ['exact']
        }
        interfaces = (relay.Node, )


class Query(graphene.ObjectType):
    my_todos = DjangoFilterConnectionField(TodoNode)

    def resolve_my_todos(self, info):
        print(info.context.user)
        if not info.context.user.is_authenticated:
            return Todo.objects.none()
        else:
            return Todo.objects.filter(user=info.context.user)


class CreateTodo(graphene.Mutation):
    class Arguments:
        todo = graphene.String()
        done = graphene.Boolean()
        date = graphene.types.datetime.DateTime()

    create_todo = graphene.Field(TodoNode)

    @classmethod
    def mutate(cls, root, info, todo, done, date):
        create_todo = Todo(todo=todo, done=done, date=date,
                           user=info.context.user)
        create_todo.save()
        return CreateTodo(create_todo=create_todo)


class UpdateTodo(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        todo = graphene.String()
        done = graphene.Boolean()
        date = graphene.types.datetime.DateTime()

    update_todo = graphene.Field(TodoNode)

    @classmethod
    def mutate(cls, root, info, id, todo, done):
        update_todo = Todo.objects.get(id=id)
        update_todo.todo = todo
        update_todo.done = done
        update_todo.save()
        return UpdateTodo(update_todo=update_todo)


class DeleteTodo(graphene.Mutation):
    class Arguments:
        id = graphene.Int()

    delete_todo = graphene.Field(TodoNode)

    @classmethod
    def mutate(cls, root, info, id):
        delete_todo = Todo.objects.get(id=id)
        if delete_todo.user == info.context.user:
            delete_todo.delete()
        return


class Mutation(graphene.ObjectType):

    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
